package discordfx

import (
	"encoding/base64"
	"errors"
	"fmt"
	"strings"
)

// ParseToken parses the oauth id out of the bot token
func ParseToken(t string) (string, error) {
	tokenSegs := strings.Split(t, " ")
	if tokenSegs[0] != "Bot" {
		return "", errors.New("cant parse non bot token")
	}
	idBytes, err := base64.StdEncoding.DecodeString(strings.Split(tokenSegs[1], ".")[0] + "==")
	return string(idBytes), err
}

func GenerateOAuthURL(id string) string {
	return fmt.Sprintf("https://discord.com/api/oauth2/authorize?client_id=%s&permissions=8&scope=bot%%20applications.commands", id)
}
