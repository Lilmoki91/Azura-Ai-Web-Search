package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/worldcoin/idkit/go/idkit"
)

func handleRPSignature(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	sig, err := idkit.SignRequest(os.Getenv("RP_SIGNING_KEY"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("content-type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"sig":        sig.Sig,
		"nonce":      sig.Nonce,
		"created_at": sig.CreatedAt,
		"expires_at": sig.ExpiresAt,
	})
}
