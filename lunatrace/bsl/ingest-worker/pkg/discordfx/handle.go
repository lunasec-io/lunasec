package discordfx

import (
	"github.com/bwmarrin/discordgo"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
)

func (d *discordSession) handleMessageCreate(m *discordgo.MessageCreate) {
	s := d.session

	messageMentionsVulnBot := lo.ContainsBy(m.Mentions, func(m *discordgo.User) bool {
		return m.Username == s.State.User.Username
	})

	if !messageMentionsVulnBot {
		return
	}

	if ch, err := s.State.Channel(m.ChannelID); err != nil || !ch.IsThread() {
		msg, err := d.params.Scraper.SearchForReferences(m.Content)
		if err != nil {
			log.Error().Err(err).Msg("failed to generate response")
			_, err = s.ChannelMessageSend(m.ChannelID, "failed to generate response: "+err.Error())
			return
		}
		_, err = s.ChannelMessageSend(m.ChannelID, msg)
		if err != nil {
			log.Error().Err(err).Msg("failed to send message")
			return
		}
	} else {
		_, err = s.ChannelMessageSendReply(m.ChannelID, "pong", m.Reference())
		if err != nil {
			log.Error().Err(err).Msg("failed to send message")
			return
		}
	}
}
