import {Tokenizer} from "@lunasec/tokenizer-sdk";

export interface SecureFormData {
    ssnToken: string;
}

export async function processForm(formData: SecureFormData) {
    const tokenizer = new Tokenizer();
    const resp = await tokenizer.detokenize(formData.ssnToken);
    if (resp.success) {
        return resp.value;
    }
    return resp.error;
}