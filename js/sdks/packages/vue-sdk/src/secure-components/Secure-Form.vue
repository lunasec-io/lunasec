<template>
  <SecureFormContext.Provider
    value={{
    addTokenCommitCallback: (frameId: string, cb: () => Promise<void>) => {
    this.tokenCommitCallbacks[frameId] = cb;
    },
    removeTokenCommitCallback: (frameId: string) => {
    delete this.tokenCommitCallbacks[frameId];
    },
    submit: () => {
    if (this.form.current) {
    this.form.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    },
    }}
    >
    <form {...this.props} ref={this.form} onSubmit={(e) => this.onSubmit(e)}>
    {this.props.children}
    </form>
  </SecureFormContext.Provider>
</template>
<script lang="ts">
  import {defineComponent, ComponentCustomProps} from 'vue';
  export default defineComponent({
    name: 'SecureForm',
    props:
  })
</script>
