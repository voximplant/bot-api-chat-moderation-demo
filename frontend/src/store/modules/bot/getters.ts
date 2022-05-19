import { BotStoreState } from '@/types/src/bot';
import { GetterTree } from 'vuex';
import { storageService } from '@/services/storage.service';

export const initialState: () => BotStoreState = () => {
  return {
    blockList: [],
    conversations: [],
    logs: [],
    users: [],
    adminBasicToken: storageService.getAdminBasicToken(),
  };
};

export const botState: BotStoreState = initialState();

export const botGetters: GetterTree<BotStoreState, any> = {};
