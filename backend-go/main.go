package main

import (
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/big"
	"net/http"
	"os"
	"time"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/google/uuid"
)

var (
	signingKey *ecdsa.PrivateKey
	rpID       string
)

func init() {
	// Ambil dari environment variable
	keyHex := os.Getenv("RP_SIGNING_KEY")
	if keyHex == "" {
		log.Fatal("RP_SIGNING_KEY not set")
	}

	// Buang '0x' kalau ada
	if len(keyHex) > 2 && keyHex[:2] == "0x" {
		keyHex = keyHex[2:]
	}

	// Parse private key
	privateKey, err := crypto.HexToECDSA(keyHex)
	if err != nil {
		log.Fatal("Failed to parse private key:", err)
	}
	signingKey = privateKey

	rpID = os.Getenv("RP_ID")
	if rpID == "" {
		log.Fatal("RP_ID not set")
	}
}

type SignatureResponse struct {
	Sig       string `json:"sig"`
	Nonce     string `json:"nonce"`
	CreatedAt int64  `json:"created_at"`
	ExpiresAt int64  `json:"expires_at"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func getSignatureHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Action string `json:"action"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrorResponse{Error: "Invalid request"})
		return
	}

	// Generate signature
	timestamp := time.Now().Unix()
	nonce := uuid.New().String()
	message := fmt.Sprintf("%s:%s:%d", req.Action, nonce, timestamp)

	hash := sha256.Sum256([]byte(message))
	
	r, s, err := ecdsa.Sign(rand.Reader, signingKey, hash[:])
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ErrorResponse{Error: "Failed to sign"})
		return
	}

	// Encode signature dalam format DER
	signature := append(r.Bytes(), s.Bytes()...)

	response := SignatureResponse{
		Sig:       hex.EncodeToString(signature),
		Nonce:     nonce,
		CreatedAt: timestamp,
		ExpiresAt: timestamp + 300,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func verifyProofHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Baca body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrorResponse{Error: "Failed to read body"})
		return
	}

	// Forward ke World ID API
	resp, err := http.Post(
		fmt.Sprintf("https://developer.world.org/api/v4/verify/%s", rpID),
		"application/json",
		r.Body,
	)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode(ErrorResponse{Error: "Failed to forward request"})
		return
	}
	defer resp.Body.Close()

	// Baca response
	respBody, _ := io.ReadAll(resp.Body)

	// Hantar balik
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}

func main() {
	http.HandleFunc("/api/get-signature", getSignatureHandler)
	http.HandleFunc("/api/verify-proof", verifyProofHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
