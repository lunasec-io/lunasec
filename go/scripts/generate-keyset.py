import io
import base64
import tink
from tink import hybrid, cleartext_keyset_handle

hybrid.register()

private_keyset_handle = tink.new_keyset_handle(hybrid.hybrid_key_templates.ECIES_P256_HKDF_HMAC_SHA256_AES128_GCM)
public_keyset_handle = private_keyset_handle.public_keyset_handle()

def print_keyset(keyset):
    stream = io.BytesIO()
    writer = tink.BinaryKeysetWriter(stream)

    # TODO we should not be saving secrets like this, we should be using KMS to store this value
    cleartext_keyset_handle.write(writer, keyset)

    encoded_keyset = base64.b64encode(stream.getvalue())
    print(encoded_keyset)

print_keyset(private_keyset_handle)
print_keyset(public_keyset_handle)
