<template lang="pug">
  v-card.pt-4
    v-card-title Block list
    v-card-actions
      v-btn(
        color="primary"
        @click="onImport"
        :loading="loading"
        :disabled="loading"
      ) Import from file
    v-card-text
      v-textarea(
        v-model="blockListString"
        :disabled="!isEditing"
        label="Words to block"
        placeholder="Enter words to block. Separate words with comma. Example: bad, worse, worst"
        auto-grow
      )
    v-card-actions
      v-btn(
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="onBlockListPrimaryAction"
      ) {{blockListPrimaryActionLabel}}
      v-btn(
        @click="onBlockListCancelAction"
        :disabled="!isEditing || loading"
      ) Cancel

</template>

<script lang="ts">
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import Vue from 'vue';
import { BLOCK_LIST_SEPARATOR } from '@/config';
import { selectFile } from '@/libs/dom';
import { BlockList } from '@/types/src/bot';

@Component({})
export default class Chat extends Vue {
  isEditing = false;
  savedBlockList: string[] = [];
  @Prop() blockList: BlockList;
  @Prop() loading: boolean;

  blockListString = this.blockList.join(`${BLOCK_LIST_SEPARATOR} `);

  get blockListPrimaryActionLabel() {
    return this.isEditing ? 'Save' : 'Edit';
  }

  @Emit('update-block-list')
  async onImport() {
    this.isEditing = false;

    const file = await selectFile();
    const content = await file.text();
    const words = content
      .split(BLOCK_LIST_SEPARATOR)
      .map((word) => word.trim());

    return words;
  }

  @Emit('update-block-list')
  async saveBlockList() {
    return this.blockListString
      .split(BLOCK_LIST_SEPARATOR)
      .map((word) => word.trim());
  }

  @Watch('blockList')
  onBlockListChange() {
    this.blockListString = this.blockList.join(`${BLOCK_LIST_SEPARATOR} `);
  }

  async onBlockListPrimaryAction() {
    if (this.isEditing) {
      await this.saveBlockList();
      this.isEditing = false;
    } else {
      this.savedBlockList = JSON.parse(JSON.stringify(this.blockList));
      this.isEditing = true;
    }
  }

  @Emit('cancel-update-block-list')
  onBlockListCancelAction() {
    this.isEditing = false;
    return this.savedBlockList;
  }
}
</script>

<style scoped></style>
