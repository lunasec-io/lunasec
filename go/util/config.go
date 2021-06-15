package util

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"

	"go.uber.org/config"
)

func GetConfigProvider(configDir string) config.Provider {
	files, err := ioutil.ReadDir(configDir)
	if err != nil {
		log.Fatalln(err)
	}

	var filenames []string
	for _, file := range files {
		filenames = append(filenames, path.Join(configDir, file.Name()))
	}

	opts := make([]config.YAMLOption, 0, len(filenames)+2)
	opts = append(opts, config.Permissive(), config.Expand(os.LookupEnv))
	for _, name := range filenames {
		opts = append(opts, config.File(name))
	}
	provider, err := config.NewYAML(opts...)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	return provider
}
