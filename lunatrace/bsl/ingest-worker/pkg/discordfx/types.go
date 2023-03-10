package discordfx

import (
	"errors"
	"net/url"
	"strconv"
	"strings"
)

// Guild represents a Guild ID or Guild URL in the config.
// TODO Make this work properly. Currently requires the user to truncate the channel if they want URL notation.
type Guild string

func (g *Guild) UnmarshalYAML(unmarshal func(interface{}) error) error {
	var s string
	if err := unmarshal(&s); err != nil {
		return err
	}

	// If it's numeric, just return it.
	if _, err := strconv.Atoi(s); err == nil {
		*g = Guild(s)
		return nil
	}

	u, err := url.Parse(s)
	if err != nil {
		return err
	}

	urlParts := strings.Split(u.Path, "/")

	if len(urlParts) < 3 {
		return errors.New("invalid guild url")
	}

	*g = Guild(urlParts[2])

	// The result must be numeric.
	if _, err := strconv.Atoi(s); err != nil {
		return err
	}

	return nil
}

// Channel represents a Channel ID or Channel URL in the config.
type Channel string

func (c *Channel) UnmarshalYAML(unmarshal func(interface{}) error) error {
	var s string
	if err := unmarshal(&s); err != nil {
		return err
	}

	// If it's numeric, just return it.
	if _, err := strconv.Atoi(s); err == nil {
		*c = Channel(s)
		return nil
	}

	u, err := url.Parse(s)
	if err != nil {
		return err
	}

	urlParts := strings.Split(u.Path, "/")

	if len(urlParts) < 4 {
		return errors.New("invalid channel url")
	}

	*c = Channel(urlParts[3])

	// The result must be numeric.
	if _, err := strconv.Atoi(string(*c)); err != nil {
		return err
	}

	return nil
}
