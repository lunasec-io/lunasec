import {Tokenizer} from "@lunasec/tokenizer-sdk";

export interface SecureFormData {
    ssnToken: string;
}

export async function processForm(formData: SecureFormData) {
    const tokenizer = new Tokenizer();
    const plaintext = await tokenizer.detokenize(formData.ssnToken);
    console.log(plaintext);
    return plaintext;
}