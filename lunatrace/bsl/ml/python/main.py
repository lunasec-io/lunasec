#!/usr/bin/env python3
import argparse
from scrape_utils import summarize_scraped, clean_scraped_advisories, summarize_package_readme, summarize_code_snippets
from chat_bot import chat_bot



def main() :
	parser = argparse.ArgumentParser(description='A collection of lunatrace ML tools')
	subparsers = parser.add_subparsers()

	# data ingestion commands
	summarize_scraped.add_subparser(subparsers)
	clean_scraped_advisories.add_subparser(subparsers)
	summarize_package_readme.add_subparser(subparsers)
	summarize_code_snippets.add_subparser(subparsers)

	#chat command
	chat_bot.add_subparser(subparsers)

	args = parser.parse_args()

	# Call the appropriate function based on the subparser
	if hasattr(args, 'func'):
		args.func(args)
	else:
		raise Exception("Must pass a command, try --help")


if __name__ == "__main__":
	main()
