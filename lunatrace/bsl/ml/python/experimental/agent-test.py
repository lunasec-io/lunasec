
import requests
url = "https://github.com/advisories/GHSA-f598-mfpv-gmfx"
proxy = "http://d74bd93f71d8bbc886bfd3a90dfdaf87205b021b:premium_proxies=true&js_render=true&block_resources=image%2Cmedia%2Cstylesheet@proxy.zenrows.com:8001"
proxies = {"http": proxy, "https": proxy}
response = requests.get(url, proxies=proxies, verify=False)
print(response.text)
