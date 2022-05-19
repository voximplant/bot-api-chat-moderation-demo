/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import {
  Message,
  UserInfo,
  RetransmitEventsRequest,
  MessageReceivedEvent,
  MessageEditedEvent,
  MessageRemovedEvent,
  ConversationEditedEvent,
  RetransmitEventsResponse,
} from './structs';
import { Struct } from './google/protobuf/struct';

export const protobufPackage = 'vox.bot';

/** Enum that represents command types that bots can execute. */
export enum BotCommandType {
  /** SendMessage - SendMessage - send a message to a conversation. */
  SendMessage = 0,
  /** EditMessage - EditMessage – edit a message in a conversation. */
  EditMessage = 1,
  /** RemoveMessage - RemoveMessage – remove a message from a conversation. */
  RemoveMessage = 2,
  /**
   * EnqueueTask - EnqueueTask - enqueue task to SmartQueue. Available only within stream `ConnectWithSQ`.
   * @hidden
   */
  EnqueueTask = 3,
  /**
   * EndTask - EndTask - end task processing in SmartQueue. Available only within stream `ConnectWithSQ`.
   * @hidden
   */
  EndTask = 4,
  /** RetransmitEvents - RetransmitEvents - request for retransmitting messages within a conversation. */
  RetransmitEvents = 5,
  /** Transfer - Transfer - request for transferring conversation to another operator; */
  Transfer = 6,
  UNRECOGNIZED = -1,
}

export function botCommandTypeFromJSON(object: any): BotCommandType {
  switch (object) {
    case 0:
    case 'SendMessage':
      return BotCommandType.SendMessage;
    case 1:
    case 'EditMessage':
      return BotCommandType.EditMessage;
    case 2:
    case 'RemoveMessage':
      return BotCommandType.RemoveMessage;
    case 3:
    case 'EnqueueTask':
      return BotCommandType.EnqueueTask;
    case 4:
    case 'EndTask':
      return BotCommandType.EndTask;
    case 5:
    case 'RetransmitEvents':
      return BotCommandType.RetransmitEvents;
    case 6:
    case 'Transfer':
      return BotCommandType.Transfer;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return BotCommandType.UNRECOGNIZED;
  }
}

export function botCommandTypeToJSON(object: BotCommandType): string {
  switch (object) {
    case BotCommandType.SendMessage:
      return 'SendMessage';
    case BotCommandType.EditMessage:
      return 'EditMessage';
    case BotCommandType.RemoveMessage:
      return 'RemoveMessage';
    case BotCommandType.EnqueueTask:
      return 'EnqueueTask';
    case BotCommandType.EndTask:
      return 'EndTask';
    case BotCommandType.RetransmitEvents:
      return 'RetransmitEvents';
    case BotCommandType.Transfer:
      return 'Transfer';
    default:
      return 'UNKNOWN';
  }
}

/**
 * Enum that represents event types that bots can receive.
 *
 * To receive the events related to a conversation, a bot should be a participant of this conversation.
 */
export enum BotEventType {
  /** MessageReceived - Type for [MessageReceivedEvent]. */
  MessageReceived = 0,
  /** MessageEdited - Type for [MessageEditedEvent]. */
  MessageEdited = 1,
  /** MessageRemoved - Type for [MessageRemovedEvent]. */
  MessageRemoved = 2,
  /** ConversationEdited - Type for [ConversationEditedEvent]. */
  ConversationEdited = 3,
  /** ErrorOccurred - Type for [ErrorOccurredEvent]. */
  ErrorOccurred = 4,
  /** TaskDistributed - @ hidden */
  TaskDistributed = 5,
  /** TaskEnqueued - @ hidden */
  TaskEnqueued = 6,
  /** TaskFinished - @ hidden */
  TaskFinished = 7,
  /** Retransmitted - @ hidden */
  Retransmitted = 8,
  UNRECOGNIZED = -1,
}

export function botEventTypeFromJSON(object: any): BotEventType {
  switch (object) {
    case 0:
    case 'MessageReceived':
      return BotEventType.MessageReceived;
    case 1:
    case 'MessageEdited':
      return BotEventType.MessageEdited;
    case 2:
    case 'MessageRemoved':
      return BotEventType.MessageRemoved;
    case 3:
    case 'ConversationEdited':
      return BotEventType.ConversationEdited;
    case 4:
    case 'ErrorOccurred':
      return BotEventType.ErrorOccurred;
    case 5:
    case 'TaskDistributed':
      return BotEventType.TaskDistributed;
    case 6:
    case 'TaskEnqueued':
      return BotEventType.TaskEnqueued;
    case 7:
    case 'TaskFinished':
      return BotEventType.TaskFinished;
    case 8:
    case 'Retransmitted':
      return BotEventType.Retransmitted;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return BotEventType.UNRECOGNIZED;
  }
}

export function botEventTypeToJSON(object: BotEventType): string {
  switch (object) {
    case BotEventType.MessageReceived:
      return 'MessageReceived';
    case BotEventType.MessageEdited:
      return 'MessageEdited';
    case BotEventType.MessageRemoved:
      return 'MessageRemoved';
    case BotEventType.ConversationEdited:
      return 'ConversationEdited';
    case BotEventType.ErrorOccurred:
      return 'ErrorOccurred';
    case BotEventType.TaskDistributed:
      return 'TaskDistributed';
    case BotEventType.TaskEnqueued:
      return 'TaskEnqueued';
    case BotEventType.TaskFinished:
      return 'TaskFinished';
    case BotEventType.Retransmitted:
      return 'Retransmitted';
    default:
      return 'UNKNOWN';
  }
}

/** Request structure for the [CreateBot] method. */
export interface CreateBotRequest {
  /**
   * Bot name. A name must be at least 1 characters long.
   * Latin characters, digits and special symbols are allowed.
   */
  name: string;
  /** JSON object with a custom bot data. */
  customData?: { [key: string]: any };
}

/**
 * Response structure for the [CreateBot] method.
 *
 * The whole JSON structure should be passed to JWT in order to authenticate a bot.
 */
export interface CreateBotResponse {
  /** Private key for authentication. Service field. */
  privateKey: string;
  /** Unique ID of a private key. Service field. */
  keyId: string;
  /** Email of the current Voximplant developer account. */
  clientEmail: string;
  /** IM unique ID to identify bots in events and specify in user-related methods. */
  clientId: number;
  /** Name that is specified in a request with the `bot_` prefix. */
  clientName: string;
}

/** Request structure for the [RemoveBot] event. */
export interface RemoveBotRequest {
  /** Bot ID. */
  id: number;
}

/**
 * The structure that defines a message to be sent.
 *
 * SendMessageRequest could be used in the [BotCommand] general structure.
 */
export interface SendMessageRequest {
  /** Conversation UUID. */
  conversationUUID: string;
  /** Message text. Maximum length is 5000 symbols. */
  text: string;
  /** Array of JSON objects with a custom data. */
  payload: { [key: string]: any }[];
}

/**
 * The structure that specifies the message changes.
 *
 * EditMessageRequest could be used in the [BotCommand] general structure.
 */
export interface EditMessageRequest {
  /** Message object. */
  message?: Message;
}

/**
 * The structure that defines a message to be removed.
 *
 * SendMessageRequest could be used in the [BotCommand] general structure.
 */
export interface RemoveMessageRequest {
  /** Conversation UUID. */
  conversationUUID: string;
  /** Message UUID. */
  messageUUID: string;
}

/** General structure to specify the type of a bot's command. */
export interface BotCommand {
  /** Type of a command. */
  type: BotCommandType;
  sendMessageRequest?: SendMessageRequest | undefined;
  editMessageRequest?: EditMessageRequest | undefined;
  removeMessageRequest?: RemoveMessageRequest | undefined;
  retransmitEventsRequest?: RetransmitEventsRequest | undefined;
}

/** Event is triggered when an error occurred while sending any request. */
export interface ErrorOccurredEvent {
  /** Conversation UUID. */
  conversationUUID: string;
  /** Message UUID. */
  messageUUID: string;
  /** Error code. */
  code: number;
  /** Error description. */
  description: string;
  /** Event which caused the error. */
  event: string;
}

/** General structure to specify the type of a bot's event. */
export interface BotEvent {
  /** Type of the incoming event. */
  type: BotEventType;
  messageReceivedEvent?: MessageReceivedEvent | undefined;
  messageEditedEvent?: MessageEditedEvent | undefined;
  messageRemovedEvent?: MessageRemovedEvent | undefined;
  conversationEditedEvent?: ConversationEditedEvent | undefined;
  errorOccurredEvent?: ErrorOccurredEvent | undefined;
  /** HINT: common fields with SQBotEvent have to be on the same places */
  retransmitEvent?: RetransmitEventsResponse | undefined;
}

/** @hidden */
export interface EnqueueSuccessEvent {
  conversationUUID: string;
  taskId: string;
}

/** @hidden */
export interface DistributionTaskEvent {
  conversationUUID: string;
  taskId: string;
  agentInfo?: UserInfo;
}

/** @hidden */
export interface TaskFinishedEvent {
  taskId: string;
  reason: TaskFinishedEvent_FinishReason;
  conversationUUID: string;
}

export enum TaskFinishedEvent_FinishReason {
  NONE = 0,
  FINISHED_BY_OPERATOR = 1,
  FINISHED_BY_CLIENT = 2,
  EMPTY_QUEUE = 3,
  /** AWAIT_TIMEOUT_REACHED - was not used */
  AWAIT_TIMEOUT_REACHED = 4,
  MAX_TIME_IN_QUEUE_REACHED = 5,
  MAX_QUEUE_SIZE_REACHED = 6,
  TRANSFERRED = 7,
  OPERATOR_TIMEOUT = 8,
  CLIENT_TIMEOUT = 9,
  UNRECOGNIZED = -1,
}

export function taskFinishedEvent_FinishReasonFromJSON(
  object: any,
): TaskFinishedEvent_FinishReason {
  switch (object) {
    case 0:
    case 'NONE':
      return TaskFinishedEvent_FinishReason.NONE;
    case 1:
    case 'FINISHED_BY_OPERATOR':
      return TaskFinishedEvent_FinishReason.FINISHED_BY_OPERATOR;
    case 2:
    case 'FINISHED_BY_CLIENT':
      return TaskFinishedEvent_FinishReason.FINISHED_BY_CLIENT;
    case 3:
    case 'EMPTY_QUEUE':
      return TaskFinishedEvent_FinishReason.EMPTY_QUEUE;
    case 4:
    case 'AWAIT_TIMEOUT_REACHED':
      return TaskFinishedEvent_FinishReason.AWAIT_TIMEOUT_REACHED;
    case 5:
    case 'MAX_TIME_IN_QUEUE_REACHED':
      return TaskFinishedEvent_FinishReason.MAX_TIME_IN_QUEUE_REACHED;
    case 6:
    case 'MAX_QUEUE_SIZE_REACHED':
      return TaskFinishedEvent_FinishReason.MAX_QUEUE_SIZE_REACHED;
    case 7:
    case 'TRANSFERRED':
      return TaskFinishedEvent_FinishReason.TRANSFERRED;
    case 8:
    case 'OPERATOR_TIMEOUT':
      return TaskFinishedEvent_FinishReason.OPERATOR_TIMEOUT;
    case 9:
    case 'CLIENT_TIMEOUT':
      return TaskFinishedEvent_FinishReason.CLIENT_TIMEOUT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TaskFinishedEvent_FinishReason.UNRECOGNIZED;
  }
}

export function taskFinishedEvent_FinishReasonToJSON(
  object: TaskFinishedEvent_FinishReason,
): string {
  switch (object) {
    case TaskFinishedEvent_FinishReason.NONE:
      return 'NONE';
    case TaskFinishedEvent_FinishReason.FINISHED_BY_OPERATOR:
      return 'FINISHED_BY_OPERATOR';
    case TaskFinishedEvent_FinishReason.FINISHED_BY_CLIENT:
      return 'FINISHED_BY_CLIENT';
    case TaskFinishedEvent_FinishReason.EMPTY_QUEUE:
      return 'EMPTY_QUEUE';
    case TaskFinishedEvent_FinishReason.AWAIT_TIMEOUT_REACHED:
      return 'AWAIT_TIMEOUT_REACHED';
    case TaskFinishedEvent_FinishReason.MAX_TIME_IN_QUEUE_REACHED:
      return 'MAX_TIME_IN_QUEUE_REACHED';
    case TaskFinishedEvent_FinishReason.MAX_QUEUE_SIZE_REACHED:
      return 'MAX_QUEUE_SIZE_REACHED';
    case TaskFinishedEvent_FinishReason.TRANSFERRED:
      return 'TRANSFERRED';
    case TaskFinishedEvent_FinishReason.OPERATOR_TIMEOUT:
      return 'OPERATOR_TIMEOUT';
    case TaskFinishedEvent_FinishReason.CLIENT_TIMEOUT:
      return 'CLIENT_TIMEOUT';
    default:
      return 'UNKNOWN';
  }
}

/** @hidden */
export interface SQBotEvent {
  /** Type of the incoming event. */
  type: BotEventType;
  messageReceivedEvent?: MessageReceivedEvent | undefined;
  messageEditedEvent?: MessageEditedEvent | undefined;
  messageRemovedEvent?: MessageRemovedEvent | undefined;
  conversationEditedEvent?: ConversationEditedEvent | undefined;
  errorOccurredEvent?: ErrorOccurredEvent | undefined;
  distributionTaskEvent?: DistributionTaskEvent | undefined;
  enqueueSuccessEvent?: EnqueueSuccessEvent | undefined;
  taskFinishedEvent?: TaskFinishedEvent | undefined;
  retransmitEvent?: RetransmitEventsResponse | undefined;
}

/**
 * The structure that defines a queue's brief info
 * @hidden
 */
export interface QueueInfo {
  sqQueueId: number;
  sqQueueName: string;
}

/**
 * The structure that defines a skill info
 * @hidden
 */
export interface Skill {
  name: string;
  level: number;
}

/**
 * The structure that defines a message for enqueue task
 * @hidden
 */
export interface EnqueueTaskRequest {
  /** Conversation UUID. */
  conversationUUID: string;
  /** Queue info to enqueue the task */
  queueInfo?: QueueInfo;
  /** Required skills for processing task */
  skills: Skill[];
  /** Timeout for waiting operator's first reaction */
  establishTimeoutSec: number;
  /** Timeout for waiting operator's reaction for the client's last action within the conversation */
  replyTimeoutSec: number;
  /** JSON object with a custom bot data. */
  customData?: { [key: string]: any };
  /** Timeout for waiting client's reaction for the operator's last action within the conversation */
  clientTimeoutSec: number;
  /** Task priority in queue */
  taskPriority: number;
}

/**
 * The structure that defines a message for enqueue task
 * @hidden
 */
export interface EndTaskRequest {
  /** Task ID for end request */
  taskId: string;
  /** Queue info to enqueue the task */
  status: EndTaskRequest_CloseStatus;
}

export enum EndTaskRequest_CloseStatus {
  CLIENT_TERMINATION = 0,
  AGENT_TERMINATION = 1,
  CANCEL_TASK = 3,
  UNRECOGNIZED = -1,
}

export function endTaskRequest_CloseStatusFromJSON(
  object: any,
): EndTaskRequest_CloseStatus {
  switch (object) {
    case 0:
    case 'CLIENT_TERMINATION':
      return EndTaskRequest_CloseStatus.CLIENT_TERMINATION;
    case 1:
    case 'AGENT_TERMINATION':
      return EndTaskRequest_CloseStatus.AGENT_TERMINATION;
    case 3:
    case 'CANCEL_TASK':
      return EndTaskRequest_CloseStatus.CANCEL_TASK;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return EndTaskRequest_CloseStatus.UNRECOGNIZED;
  }
}

export function endTaskRequest_CloseStatusToJSON(
  object: EndTaskRequest_CloseStatus,
): string {
  switch (object) {
    case EndTaskRequest_CloseStatus.CLIENT_TERMINATION:
      return 'CLIENT_TERMINATION';
    case EndTaskRequest_CloseStatus.AGENT_TERMINATION:
      return 'AGENT_TERMINATION';
    case EndTaskRequest_CloseStatus.CANCEL_TASK:
      return 'CANCEL_TASK';
    default:
      return 'UNKNOWN';
  }
}

/** The structure that defines a message for transfer conversation to another operator */
export interface TransferRequest {
  conversationUUID: string;
  imUsername: string | undefined;
  userId: number | undefined;
}

/**
 * General structure to specify the type of a bot's command.
 * @hidden
 */
export interface SQBotCommand {
  /** Type of a command. */
  type: BotCommandType;
  sendMessageRequest?: SendMessageRequest | undefined;
  editMessageRequest?: EditMessageRequest | undefined;
  removeMessageRequest?: RemoveMessageRequest | undefined;
  enqueueTaskRequest?: EnqueueTaskRequest | undefined;
  endTaskRequest?: EndTaskRequest | undefined;
  retransmitEventsRequest?: RetransmitEventsRequest | undefined;
  transferRequest?: TransferRequest | undefined;
}

/**
 * Request structure for the [RegisterWebHook] method.
 * @hidden
 */
export interface RegisterWebHookRequest {
  /**
   * URL to register as a webhook.
   * Should start with a protocol, e.g. `https://`.
   */
  callbackUrl: string;
}

/**
 * Response structure for the [RegisterWebHook] method.
 * @hidden
 */
export interface RegisterWebHookResponse {
  /** UUID of the created webhook. */
  uuid: string;
}

/**
 * Request structure for the [UnregisterWebHook] method.
 * @hidden
 */
export interface UnregisterWebHookRequest {
  /** UUID which specifies one of existing webhooks. */
  uuid: string;
}

function createBaseCreateBotRequest(): CreateBotRequest {
  return { name: '', customData: undefined };
}

export const CreateBotRequest = {
  encode(message: CreateBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBotRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      customData: isObject(object.customData) ? object.customData : undefined,
    };
  },

  toJSON(message: CreateBotRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.customData !== undefined && (obj.customData = message.customData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateBotRequest>, I>>(
    object: I,
  ): CreateBotRequest {
    const message = createBaseCreateBotRequest();
    message.name = object.name ?? '';
    message.customData = object.customData ?? undefined;
    return message;
  },
};

function createBaseCreateBotResponse(): CreateBotResponse {
  return {
    privateKey: '',
    keyId: '',
    clientEmail: '',
    clientId: 0,
    clientName: '',
  };
}

export const CreateBotResponse = {
  encode(message: CreateBotResponse, writer: Writer = Writer.create()): Writer {
    if (message.privateKey !== '') {
      writer.uint32(10).string(message.privateKey);
    }
    if (message.keyId !== '') {
      writer.uint32(18).string(message.keyId);
    }
    if (message.clientEmail !== '') {
      writer.uint32(26).string(message.clientEmail);
    }
    if (message.clientId !== 0) {
      writer.uint32(32).sint64(message.clientId);
    }
    if (message.clientName !== '') {
      writer.uint32(42).string(message.clientName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.privateKey = reader.string();
          break;
        case 2:
          message.keyId = reader.string();
          break;
        case 3:
          message.clientEmail = reader.string();
          break;
        case 4:
          message.clientId = longToNumber(reader.sint64() as Long);
          break;
        case 5:
          message.clientName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBotResponse {
    return {
      privateKey: isSet(object.private_key) ? String(object.private_key) : '',
      keyId: isSet(object.key_id) ? String(object.key_id) : '',
      clientEmail: isSet(object.client_email)
        ? String(object.client_email)
        : '',
      clientId: isSet(object.client_id) ? Number(object.client_id) : 0,
      clientName: isSet(object.client_name) ? String(object.client_name) : '',
    };
  },

  toJSON(message: CreateBotResponse): unknown {
    const obj: any = {};
    message.privateKey !== undefined && (obj.private_key = message.privateKey);
    message.keyId !== undefined && (obj.key_id = message.keyId);
    message.clientEmail !== undefined &&
      (obj.client_email = message.clientEmail);
    message.clientId !== undefined &&
      (obj.client_id = Math.round(message.clientId));
    message.clientName !== undefined && (obj.client_name = message.clientName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateBotResponse>, I>>(
    object: I,
  ): CreateBotResponse {
    const message = createBaseCreateBotResponse();
    message.privateKey = object.privateKey ?? '';
    message.keyId = object.keyId ?? '';
    message.clientEmail = object.clientEmail ?? '';
    message.clientId = object.clientId ?? 0;
    message.clientName = object.clientName ?? '';
    return message;
  },
};

function createBaseRemoveBotRequest(): RemoveBotRequest {
  return { id: 0 };
}

export const RemoveBotRequest = {
  encode(message: RemoveBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).sint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RemoveBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveBotRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: RemoveBotRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveBotRequest>, I>>(
    object: I,
  ): RemoveBotRequest {
    const message = createBaseRemoveBotRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseSendMessageRequest(): SendMessageRequest {
  return { conversationUUID: '', text: '', payload: [] };
}

export const SendMessageRequest = {
  encode(
    message: SendMessageRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.text !== '') {
      writer.uint32(18).string(message.text);
    }
    for (const v of message.payload) {
      Struct.encode(Struct.wrap(v!), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SendMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.text = reader.string();
          break;
        case 3:
          message.payload.push(
            Struct.unwrap(Struct.decode(reader, reader.uint32())),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      text: isSet(object.text) ? String(object.text) : '',
      payload: Array.isArray(object?.payload) ? [...object.payload] : [],
    };
  },

  toJSON(message: SendMessageRequest): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.text !== undefined && (obj.text = message.text);
    if (message.payload) {
      obj.payload = message.payload.map((e) => e);
    } else {
      obj.payload = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageRequest>, I>>(
    object: I,
  ): SendMessageRequest {
    const message = createBaseSendMessageRequest();
    message.conversationUUID = object.conversationUUID ?? '';
    message.text = object.text ?? '';
    message.payload = object.payload?.map((e) => e) || [];
    return message;
  },
};

function createBaseEditMessageRequest(): EditMessageRequest {
  return { message: undefined };
}

export const EditMessageRequest = {
  encode(
    message: EditMessageRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EditMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EditMessageRequest {
    return {
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: EditMessageRequest): unknown {
    const obj: any = {};
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditMessageRequest>, I>>(
    object: I,
  ): EditMessageRequest {
    const message = createBaseEditMessageRequest();
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseRemoveMessageRequest(): RemoveMessageRequest {
  return { conversationUUID: '', messageUUID: '' };
}

export const RemoveMessageRequest = {
  encode(
    message: RemoveMessageRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.messageUUID !== '') {
      writer.uint32(18).string(message.messageUUID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RemoveMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.messageUUID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveMessageRequest {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      messageUUID: isSet(object.messageUUID) ? String(object.messageUUID) : '',
    };
  },

  toJSON(message: RemoveMessageRequest): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.messageUUID !== undefined &&
      (obj.messageUUID = message.messageUUID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveMessageRequest>, I>>(
    object: I,
  ): RemoveMessageRequest {
    const message = createBaseRemoveMessageRequest();
    message.conversationUUID = object.conversationUUID ?? '';
    message.messageUUID = object.messageUUID ?? '';
    return message;
  },
};

function createBaseBotCommand(): BotCommand {
  return {
    type: 0,
    sendMessageRequest: undefined,
    editMessageRequest: undefined,
    removeMessageRequest: undefined,
    retransmitEventsRequest: undefined,
  };
}

export const BotCommand = {
  encode(message: BotCommand, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.sendMessageRequest !== undefined) {
      SendMessageRequest.encode(
        message.sendMessageRequest,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.editMessageRequest !== undefined) {
      EditMessageRequest.encode(
        message.editMessageRequest,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.removeMessageRequest !== undefined) {
      RemoveMessageRequest.encode(
        message.removeMessageRequest,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.retransmitEventsRequest !== undefined) {
      RetransmitEventsRequest.encode(
        message.retransmitEventsRequest,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BotCommand {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBotCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.sendMessageRequest = SendMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.editMessageRequest = EditMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.removeMessageRequest = RemoveMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.retransmitEventsRequest = RetransmitEventsRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BotCommand {
    return {
      type: isSet(object.type) ? botCommandTypeFromJSON(object.type) : 0,
      sendMessageRequest: isSet(object.sendMessageRequest)
        ? SendMessageRequest.fromJSON(object.sendMessageRequest)
        : undefined,
      editMessageRequest: isSet(object.editMessageRequest)
        ? EditMessageRequest.fromJSON(object.editMessageRequest)
        : undefined,
      removeMessageRequest: isSet(object.removeMessageRequest)
        ? RemoveMessageRequest.fromJSON(object.removeMessageRequest)
        : undefined,
      retransmitEventsRequest: isSet(object.retransmitEventsRequest)
        ? RetransmitEventsRequest.fromJSON(object.retransmitEventsRequest)
        : undefined,
    };
  },

  toJSON(message: BotCommand): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = botCommandTypeToJSON(message.type));
    message.sendMessageRequest !== undefined &&
      (obj.sendMessageRequest = message.sendMessageRequest
        ? SendMessageRequest.toJSON(message.sendMessageRequest)
        : undefined);
    message.editMessageRequest !== undefined &&
      (obj.editMessageRequest = message.editMessageRequest
        ? EditMessageRequest.toJSON(message.editMessageRequest)
        : undefined);
    message.removeMessageRequest !== undefined &&
      (obj.removeMessageRequest = message.removeMessageRequest
        ? RemoveMessageRequest.toJSON(message.removeMessageRequest)
        : undefined);
    message.retransmitEventsRequest !== undefined &&
      (obj.retransmitEventsRequest = message.retransmitEventsRequest
        ? RetransmitEventsRequest.toJSON(message.retransmitEventsRequest)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BotCommand>, I>>(
    object: I,
  ): BotCommand {
    const message = createBaseBotCommand();
    message.type = object.type ?? 0;
    message.sendMessageRequest =
      object.sendMessageRequest !== undefined &&
      object.sendMessageRequest !== null
        ? SendMessageRequest.fromPartial(object.sendMessageRequest)
        : undefined;
    message.editMessageRequest =
      object.editMessageRequest !== undefined &&
      object.editMessageRequest !== null
        ? EditMessageRequest.fromPartial(object.editMessageRequest)
        : undefined;
    message.removeMessageRequest =
      object.removeMessageRequest !== undefined &&
      object.removeMessageRequest !== null
        ? RemoveMessageRequest.fromPartial(object.removeMessageRequest)
        : undefined;
    message.retransmitEventsRequest =
      object.retransmitEventsRequest !== undefined &&
      object.retransmitEventsRequest !== null
        ? RetransmitEventsRequest.fromPartial(object.retransmitEventsRequest)
        : undefined;
    return message;
  },
};

function createBaseErrorOccurredEvent(): ErrorOccurredEvent {
  return {
    conversationUUID: '',
    messageUUID: '',
    code: 0,
    description: '',
    event: '',
  };
}

export const ErrorOccurredEvent = {
  encode(
    message: ErrorOccurredEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.messageUUID !== '') {
      writer.uint32(18).string(message.messageUUID);
    }
    if (message.code !== 0) {
      writer.uint32(24).sint32(message.code);
    }
    if (message.description !== '') {
      writer.uint32(34).string(message.description);
    }
    if (message.event !== '') {
      writer.uint32(42).string(message.event);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ErrorOccurredEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorOccurredEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.messageUUID = reader.string();
          break;
        case 3:
          message.code = reader.sint32();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.event = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ErrorOccurredEvent {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      messageUUID: isSet(object.messageUUID) ? String(object.messageUUID) : '',
      code: isSet(object.code) ? Number(object.code) : 0,
      description: isSet(object.description) ? String(object.description) : '',
      event: isSet(object.event) ? String(object.event) : '',
    };
  },

  toJSON(message: ErrorOccurredEvent): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.messageUUID !== undefined &&
      (obj.messageUUID = message.messageUUID);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.description !== undefined &&
      (obj.description = message.description);
    message.event !== undefined && (obj.event = message.event);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ErrorOccurredEvent>, I>>(
    object: I,
  ): ErrorOccurredEvent {
    const message = createBaseErrorOccurredEvent();
    message.conversationUUID = object.conversationUUID ?? '';
    message.messageUUID = object.messageUUID ?? '';
    message.code = object.code ?? 0;
    message.description = object.description ?? '';
    message.event = object.event ?? '';
    return message;
  },
};

function createBaseBotEvent(): BotEvent {
  return {
    type: 0,
    messageReceivedEvent: undefined,
    messageEditedEvent: undefined,
    messageRemovedEvent: undefined,
    conversationEditedEvent: undefined,
    errorOccurredEvent: undefined,
    retransmitEvent: undefined,
  };
}

export const BotEvent = {
  encode(message: BotEvent, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.messageReceivedEvent !== undefined) {
      MessageReceivedEvent.encode(
        message.messageReceivedEvent,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.messageEditedEvent !== undefined) {
      MessageEditedEvent.encode(
        message.messageEditedEvent,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.messageRemovedEvent !== undefined) {
      MessageRemovedEvent.encode(
        message.messageRemovedEvent,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.conversationEditedEvent !== undefined) {
      ConversationEditedEvent.encode(
        message.conversationEditedEvent,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.errorOccurredEvent !== undefined) {
      ErrorOccurredEvent.encode(
        message.errorOccurredEvent,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.retransmitEvent !== undefined) {
      RetransmitEventsResponse.encode(
        message.retransmitEvent,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BotEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBotEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.messageReceivedEvent = MessageReceivedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.messageEditedEvent = MessageEditedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.messageRemovedEvent = MessageRemovedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.conversationEditedEvent = ConversationEditedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.errorOccurredEvent = ErrorOccurredEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 10:
          message.retransmitEvent = RetransmitEventsResponse.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BotEvent {
    return {
      type: isSet(object.type) ? botEventTypeFromJSON(object.type) : 0,
      messageReceivedEvent: isSet(object.messageReceivedEvent)
        ? MessageReceivedEvent.fromJSON(object.messageReceivedEvent)
        : undefined,
      messageEditedEvent: isSet(object.messageEditedEvent)
        ? MessageEditedEvent.fromJSON(object.messageEditedEvent)
        : undefined,
      messageRemovedEvent: isSet(object.messageRemovedEvent)
        ? MessageRemovedEvent.fromJSON(object.messageRemovedEvent)
        : undefined,
      conversationEditedEvent: isSet(object.conversationEditedEvent)
        ? ConversationEditedEvent.fromJSON(object.conversationEditedEvent)
        : undefined,
      errorOccurredEvent: isSet(object.errorOccurredEvent)
        ? ErrorOccurredEvent.fromJSON(object.errorOccurredEvent)
        : undefined,
      retransmitEvent: isSet(object.retransmitEvent)
        ? RetransmitEventsResponse.fromJSON(object.retransmitEvent)
        : undefined,
    };
  },

  toJSON(message: BotEvent): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = botEventTypeToJSON(message.type));
    message.messageReceivedEvent !== undefined &&
      (obj.messageReceivedEvent = message.messageReceivedEvent
        ? MessageReceivedEvent.toJSON(message.messageReceivedEvent)
        : undefined);
    message.messageEditedEvent !== undefined &&
      (obj.messageEditedEvent = message.messageEditedEvent
        ? MessageEditedEvent.toJSON(message.messageEditedEvent)
        : undefined);
    message.messageRemovedEvent !== undefined &&
      (obj.messageRemovedEvent = message.messageRemovedEvent
        ? MessageRemovedEvent.toJSON(message.messageRemovedEvent)
        : undefined);
    message.conversationEditedEvent !== undefined &&
      (obj.conversationEditedEvent = message.conversationEditedEvent
        ? ConversationEditedEvent.toJSON(message.conversationEditedEvent)
        : undefined);
    message.errorOccurredEvent !== undefined &&
      (obj.errorOccurredEvent = message.errorOccurredEvent
        ? ErrorOccurredEvent.toJSON(message.errorOccurredEvent)
        : undefined);
    message.retransmitEvent !== undefined &&
      (obj.retransmitEvent = message.retransmitEvent
        ? RetransmitEventsResponse.toJSON(message.retransmitEvent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BotEvent>, I>>(object: I): BotEvent {
    const message = createBaseBotEvent();
    message.type = object.type ?? 0;
    message.messageReceivedEvent =
      object.messageReceivedEvent !== undefined &&
      object.messageReceivedEvent !== null
        ? MessageReceivedEvent.fromPartial(object.messageReceivedEvent)
        : undefined;
    message.messageEditedEvent =
      object.messageEditedEvent !== undefined &&
      object.messageEditedEvent !== null
        ? MessageEditedEvent.fromPartial(object.messageEditedEvent)
        : undefined;
    message.messageRemovedEvent =
      object.messageRemovedEvent !== undefined &&
      object.messageRemovedEvent !== null
        ? MessageRemovedEvent.fromPartial(object.messageRemovedEvent)
        : undefined;
    message.conversationEditedEvent =
      object.conversationEditedEvent !== undefined &&
      object.conversationEditedEvent !== null
        ? ConversationEditedEvent.fromPartial(object.conversationEditedEvent)
        : undefined;
    message.errorOccurredEvent =
      object.errorOccurredEvent !== undefined &&
      object.errorOccurredEvent !== null
        ? ErrorOccurredEvent.fromPartial(object.errorOccurredEvent)
        : undefined;
    message.retransmitEvent =
      object.retransmitEvent !== undefined && object.retransmitEvent !== null
        ? RetransmitEventsResponse.fromPartial(object.retransmitEvent)
        : undefined;
    return message;
  },
};

function createBaseEnqueueSuccessEvent(): EnqueueSuccessEvent {
  return { conversationUUID: '', taskId: '' };
}

export const EnqueueSuccessEvent = {
  encode(
    message: EnqueueSuccessEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.taskId !== '') {
      writer.uint32(18).string(message.taskId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnqueueSuccessEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnqueueSuccessEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.taskId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EnqueueSuccessEvent {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      taskId: isSet(object.taskId) ? String(object.taskId) : '',
    };
  },

  toJSON(message: EnqueueSuccessEvent): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.taskId !== undefined && (obj.taskId = message.taskId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EnqueueSuccessEvent>, I>>(
    object: I,
  ): EnqueueSuccessEvent {
    const message = createBaseEnqueueSuccessEvent();
    message.conversationUUID = object.conversationUUID ?? '';
    message.taskId = object.taskId ?? '';
    return message;
  },
};

function createBaseDistributionTaskEvent(): DistributionTaskEvent {
  return { conversationUUID: '', taskId: '', agentInfo: undefined };
}

export const DistributionTaskEvent = {
  encode(
    message: DistributionTaskEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.taskId !== '') {
      writer.uint32(18).string(message.taskId);
    }
    if (message.agentInfo !== undefined) {
      UserInfo.encode(message.agentInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DistributionTaskEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionTaskEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.taskId = reader.string();
          break;
        case 3:
          message.agentInfo = UserInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionTaskEvent {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      taskId: isSet(object.taskId) ? String(object.taskId) : '',
      agentInfo: isSet(object.agentInfo)
        ? UserInfo.fromJSON(object.agentInfo)
        : undefined,
    };
  },

  toJSON(message: DistributionTaskEvent): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.taskId !== undefined && (obj.taskId = message.taskId);
    message.agentInfo !== undefined &&
      (obj.agentInfo = message.agentInfo
        ? UserInfo.toJSON(message.agentInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributionTaskEvent>, I>>(
    object: I,
  ): DistributionTaskEvent {
    const message = createBaseDistributionTaskEvent();
    message.conversationUUID = object.conversationUUID ?? '';
    message.taskId = object.taskId ?? '';
    message.agentInfo =
      object.agentInfo !== undefined && object.agentInfo !== null
        ? UserInfo.fromPartial(object.agentInfo)
        : undefined;
    return message;
  },
};

function createBaseTaskFinishedEvent(): TaskFinishedEvent {
  return { taskId: '', reason: 0, conversationUUID: '' };
}

export const TaskFinishedEvent = {
  encode(message: TaskFinishedEvent, writer: Writer = Writer.create()): Writer {
    if (message.taskId !== '') {
      writer.uint32(10).string(message.taskId);
    }
    if (message.reason !== 0) {
      writer.uint32(16).int32(message.reason);
    }
    if (message.conversationUUID !== '') {
      writer.uint32(26).string(message.conversationUUID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskFinishedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskFinishedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskId = reader.string();
          break;
        case 2:
          message.reason = reader.int32() as any;
          break;
        case 3:
          message.conversationUUID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskFinishedEvent {
    return {
      taskId: isSet(object.taskId) ? String(object.taskId) : '',
      reason: isSet(object.reason)
        ? taskFinishedEvent_FinishReasonFromJSON(object.reason)
        : 0,
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
    };
  },

  toJSON(message: TaskFinishedEvent): unknown {
    const obj: any = {};
    message.taskId !== undefined && (obj.taskId = message.taskId);
    message.reason !== undefined &&
      (obj.reason = taskFinishedEvent_FinishReasonToJSON(message.reason));
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskFinishedEvent>, I>>(
    object: I,
  ): TaskFinishedEvent {
    const message = createBaseTaskFinishedEvent();
    message.taskId = object.taskId ?? '';
    message.reason = object.reason ?? 0;
    message.conversationUUID = object.conversationUUID ?? '';
    return message;
  },
};

function createBaseSQBotEvent(): SQBotEvent {
  return {
    type: 0,
    messageReceivedEvent: undefined,
    messageEditedEvent: undefined,
    messageRemovedEvent: undefined,
    conversationEditedEvent: undefined,
    errorOccurredEvent: undefined,
    distributionTaskEvent: undefined,
    enqueueSuccessEvent: undefined,
    taskFinishedEvent: undefined,
    retransmitEvent: undefined,
  };
}

export const SQBotEvent = {
  encode(message: SQBotEvent, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.messageReceivedEvent !== undefined) {
      MessageReceivedEvent.encode(
        message.messageReceivedEvent,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.messageEditedEvent !== undefined) {
      MessageEditedEvent.encode(
        message.messageEditedEvent,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.messageRemovedEvent !== undefined) {
      MessageRemovedEvent.encode(
        message.messageRemovedEvent,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.conversationEditedEvent !== undefined) {
      ConversationEditedEvent.encode(
        message.conversationEditedEvent,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.errorOccurredEvent !== undefined) {
      ErrorOccurredEvent.encode(
        message.errorOccurredEvent,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.distributionTaskEvent !== undefined) {
      DistributionTaskEvent.encode(
        message.distributionTaskEvent,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.enqueueSuccessEvent !== undefined) {
      EnqueueSuccessEvent.encode(
        message.enqueueSuccessEvent,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.taskFinishedEvent !== undefined) {
      TaskFinishedEvent.encode(
        message.taskFinishedEvent,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.retransmitEvent !== undefined) {
      RetransmitEventsResponse.encode(
        message.retransmitEvent,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SQBotEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSQBotEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.messageReceivedEvent = MessageReceivedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.messageEditedEvent = MessageEditedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.messageRemovedEvent = MessageRemovedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.conversationEditedEvent = ConversationEditedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.errorOccurredEvent = ErrorOccurredEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 7:
          message.distributionTaskEvent = DistributionTaskEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 8:
          message.enqueueSuccessEvent = EnqueueSuccessEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 9:
          message.taskFinishedEvent = TaskFinishedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 10:
          message.retransmitEvent = RetransmitEventsResponse.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SQBotEvent {
    return {
      type: isSet(object.type) ? botEventTypeFromJSON(object.type) : 0,
      messageReceivedEvent: isSet(object.messageReceivedEvent)
        ? MessageReceivedEvent.fromJSON(object.messageReceivedEvent)
        : undefined,
      messageEditedEvent: isSet(object.messageEditedEvent)
        ? MessageEditedEvent.fromJSON(object.messageEditedEvent)
        : undefined,
      messageRemovedEvent: isSet(object.messageRemovedEvent)
        ? MessageRemovedEvent.fromJSON(object.messageRemovedEvent)
        : undefined,
      conversationEditedEvent: isSet(object.conversationEditedEvent)
        ? ConversationEditedEvent.fromJSON(object.conversationEditedEvent)
        : undefined,
      errorOccurredEvent: isSet(object.errorOccurredEvent)
        ? ErrorOccurredEvent.fromJSON(object.errorOccurredEvent)
        : undefined,
      distributionTaskEvent: isSet(object.distributionTaskEvent)
        ? DistributionTaskEvent.fromJSON(object.distributionTaskEvent)
        : undefined,
      enqueueSuccessEvent: isSet(object.enqueueSuccessEvent)
        ? EnqueueSuccessEvent.fromJSON(object.enqueueSuccessEvent)
        : undefined,
      taskFinishedEvent: isSet(object.taskFinishedEvent)
        ? TaskFinishedEvent.fromJSON(object.taskFinishedEvent)
        : undefined,
      retransmitEvent: isSet(object.retransmitEvent)
        ? RetransmitEventsResponse.fromJSON(object.retransmitEvent)
        : undefined,
    };
  },

  toJSON(message: SQBotEvent): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = botEventTypeToJSON(message.type));
    message.messageReceivedEvent !== undefined &&
      (obj.messageReceivedEvent = message.messageReceivedEvent
        ? MessageReceivedEvent.toJSON(message.messageReceivedEvent)
        : undefined);
    message.messageEditedEvent !== undefined &&
      (obj.messageEditedEvent = message.messageEditedEvent
        ? MessageEditedEvent.toJSON(message.messageEditedEvent)
        : undefined);
    message.messageRemovedEvent !== undefined &&
      (obj.messageRemovedEvent = message.messageRemovedEvent
        ? MessageRemovedEvent.toJSON(message.messageRemovedEvent)
        : undefined);
    message.conversationEditedEvent !== undefined &&
      (obj.conversationEditedEvent = message.conversationEditedEvent
        ? ConversationEditedEvent.toJSON(message.conversationEditedEvent)
        : undefined);
    message.errorOccurredEvent !== undefined &&
      (obj.errorOccurredEvent = message.errorOccurredEvent
        ? ErrorOccurredEvent.toJSON(message.errorOccurredEvent)
        : undefined);
    message.distributionTaskEvent !== undefined &&
      (obj.distributionTaskEvent = message.distributionTaskEvent
        ? DistributionTaskEvent.toJSON(message.distributionTaskEvent)
        : undefined);
    message.enqueueSuccessEvent !== undefined &&
      (obj.enqueueSuccessEvent = message.enqueueSuccessEvent
        ? EnqueueSuccessEvent.toJSON(message.enqueueSuccessEvent)
        : undefined);
    message.taskFinishedEvent !== undefined &&
      (obj.taskFinishedEvent = message.taskFinishedEvent
        ? TaskFinishedEvent.toJSON(message.taskFinishedEvent)
        : undefined);
    message.retransmitEvent !== undefined &&
      (obj.retransmitEvent = message.retransmitEvent
        ? RetransmitEventsResponse.toJSON(message.retransmitEvent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SQBotEvent>, I>>(
    object: I,
  ): SQBotEvent {
    const message = createBaseSQBotEvent();
    message.type = object.type ?? 0;
    message.messageReceivedEvent =
      object.messageReceivedEvent !== undefined &&
      object.messageReceivedEvent !== null
        ? MessageReceivedEvent.fromPartial(object.messageReceivedEvent)
        : undefined;
    message.messageEditedEvent =
      object.messageEditedEvent !== undefined &&
      object.messageEditedEvent !== null
        ? MessageEditedEvent.fromPartial(object.messageEditedEvent)
        : undefined;
    message.messageRemovedEvent =
      object.messageRemovedEvent !== undefined &&
      object.messageRemovedEvent !== null
        ? MessageRemovedEvent.fromPartial(object.messageRemovedEvent)
        : undefined;
    message.conversationEditedEvent =
      object.conversationEditedEvent !== undefined &&
      object.conversationEditedEvent !== null
        ? ConversationEditedEvent.fromPartial(object.conversationEditedEvent)
        : undefined;
    message.errorOccurredEvent =
      object.errorOccurredEvent !== undefined &&
      object.errorOccurredEvent !== null
        ? ErrorOccurredEvent.fromPartial(object.errorOccurredEvent)
        : undefined;
    message.distributionTaskEvent =
      object.distributionTaskEvent !== undefined &&
      object.distributionTaskEvent !== null
        ? DistributionTaskEvent.fromPartial(object.distributionTaskEvent)
        : undefined;
    message.enqueueSuccessEvent =
      object.enqueueSuccessEvent !== undefined &&
      object.enqueueSuccessEvent !== null
        ? EnqueueSuccessEvent.fromPartial(object.enqueueSuccessEvent)
        : undefined;
    message.taskFinishedEvent =
      object.taskFinishedEvent !== undefined &&
      object.taskFinishedEvent !== null
        ? TaskFinishedEvent.fromPartial(object.taskFinishedEvent)
        : undefined;
    message.retransmitEvent =
      object.retransmitEvent !== undefined && object.retransmitEvent !== null
        ? RetransmitEventsResponse.fromPartial(object.retransmitEvent)
        : undefined;
    return message;
  },
};

function createBaseQueueInfo(): QueueInfo {
  return { sqQueueId: 0, sqQueueName: '' };
}

export const QueueInfo = {
  encode(message: QueueInfo, writer: Writer = Writer.create()): Writer {
    if (message.sqQueueId !== 0) {
      writer.uint32(8).sint64(message.sqQueueId);
    }
    if (message.sqQueueName !== '') {
      writer.uint32(18).string(message.sqQueueName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueueInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sqQueueId = longToNumber(reader.sint64() as Long);
          break;
        case 2:
          message.sqQueueName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueueInfo {
    return {
      sqQueueId: isSet(object.sqQueueId) ? Number(object.sqQueueId) : 0,
      sqQueueName: isSet(object.sqQueueName) ? String(object.sqQueueName) : '',
    };
  },

  toJSON(message: QueueInfo): unknown {
    const obj: any = {};
    message.sqQueueId !== undefined &&
      (obj.sqQueueId = Math.round(message.sqQueueId));
    message.sqQueueName !== undefined &&
      (obj.sqQueueName = message.sqQueueName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueueInfo>, I>>(
    object: I,
  ): QueueInfo {
    const message = createBaseQueueInfo();
    message.sqQueueId = object.sqQueueId ?? 0;
    message.sqQueueName = object.sqQueueName ?? '';
    return message;
  },
};

function createBaseSkill(): Skill {
  return { name: '', level: 0 };
}

export const Skill = {
  encode(message: Skill, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.level !== 0) {
      writer.uint32(16).sint32(message.level);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Skill {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkill();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.level = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Skill {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      level: isSet(object.level) ? Number(object.level) : 0,
    };
  },

  toJSON(message: Skill): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.level !== undefined && (obj.level = Math.round(message.level));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Skill>, I>>(object: I): Skill {
    const message = createBaseSkill();
    message.name = object.name ?? '';
    message.level = object.level ?? 0;
    return message;
  },
};

function createBaseEnqueueTaskRequest(): EnqueueTaskRequest {
  return {
    conversationUUID: '',
    queueInfo: undefined,
    skills: [],
    establishTimeoutSec: 0,
    replyTimeoutSec: 0,
    customData: undefined,
    clientTimeoutSec: 0,
    taskPriority: 0,
  };
}

export const EnqueueTaskRequest = {
  encode(
    message: EnqueueTaskRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.queueInfo !== undefined) {
      QueueInfo.encode(message.queueInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.skills) {
      Skill.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.establishTimeoutSec !== 0) {
      writer.uint32(32).sint32(message.establishTimeoutSec);
    }
    if (message.replyTimeoutSec !== 0) {
      writer.uint32(40).sint32(message.replyTimeoutSec);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.clientTimeoutSec !== 0) {
      writer.uint32(56).sint32(message.clientTimeoutSec);
    }
    if (message.taskPriority !== 0) {
      writer.uint32(64).sint32(message.taskPriority);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnqueueTaskRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnqueueTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.queueInfo = QueueInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.skills.push(Skill.decode(reader, reader.uint32()));
          break;
        case 4:
          message.establishTimeoutSec = reader.sint32();
          break;
        case 5:
          message.replyTimeoutSec = reader.sint32();
          break;
        case 6:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 7:
          message.clientTimeoutSec = reader.sint32();
          break;
        case 8:
          message.taskPriority = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EnqueueTaskRequest {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      queueInfo: isSet(object.queueInfo)
        ? QueueInfo.fromJSON(object.queueInfo)
        : undefined,
      skills: Array.isArray(object?.skills)
        ? object.skills.map((e: any) => Skill.fromJSON(e))
        : [],
      establishTimeoutSec: isSet(object.establishTimeoutSec)
        ? Number(object.establishTimeoutSec)
        : 0,
      replyTimeoutSec: isSet(object.replyTimeoutSec)
        ? Number(object.replyTimeoutSec)
        : 0,
      customData: isObject(object.customData) ? object.customData : undefined,
      clientTimeoutSec: isSet(object.clientTimeoutSec)
        ? Number(object.clientTimeoutSec)
        : 0,
      taskPriority: isSet(object.taskPriority)
        ? Number(object.taskPriority)
        : 0,
    };
  },

  toJSON(message: EnqueueTaskRequest): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.queueInfo !== undefined &&
      (obj.queueInfo = message.queueInfo
        ? QueueInfo.toJSON(message.queueInfo)
        : undefined);
    if (message.skills) {
      obj.skills = message.skills.map((e) => (e ? Skill.toJSON(e) : undefined));
    } else {
      obj.skills = [];
    }
    message.establishTimeoutSec !== undefined &&
      (obj.establishTimeoutSec = Math.round(message.establishTimeoutSec));
    message.replyTimeoutSec !== undefined &&
      (obj.replyTimeoutSec = Math.round(message.replyTimeoutSec));
    message.customData !== undefined && (obj.customData = message.customData);
    message.clientTimeoutSec !== undefined &&
      (obj.clientTimeoutSec = Math.round(message.clientTimeoutSec));
    message.taskPriority !== undefined &&
      (obj.taskPriority = Math.round(message.taskPriority));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EnqueueTaskRequest>, I>>(
    object: I,
  ): EnqueueTaskRequest {
    const message = createBaseEnqueueTaskRequest();
    message.conversationUUID = object.conversationUUID ?? '';
    message.queueInfo =
      object.queueInfo !== undefined && object.queueInfo !== null
        ? QueueInfo.fromPartial(object.queueInfo)
        : undefined;
    message.skills = object.skills?.map((e) => Skill.fromPartial(e)) || [];
    message.establishTimeoutSec = object.establishTimeoutSec ?? 0;
    message.replyTimeoutSec = object.replyTimeoutSec ?? 0;
    message.customData = object.customData ?? undefined;
    message.clientTimeoutSec = object.clientTimeoutSec ?? 0;
    message.taskPriority = object.taskPriority ?? 0;
    return message;
  },
};

function createBaseEndTaskRequest(): EndTaskRequest {
  return { taskId: '', status: 0 };
}

export const EndTaskRequest = {
  encode(message: EndTaskRequest, writer: Writer = Writer.create()): Writer {
    if (message.taskId !== '') {
      writer.uint32(10).string(message.taskId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EndTaskRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndTaskRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.taskId = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EndTaskRequest {
    return {
      taskId: isSet(object.taskId) ? String(object.taskId) : '',
      status: isSet(object.status)
        ? endTaskRequest_CloseStatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: EndTaskRequest): unknown {
    const obj: any = {};
    message.taskId !== undefined && (obj.taskId = message.taskId);
    message.status !== undefined &&
      (obj.status = endTaskRequest_CloseStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EndTaskRequest>, I>>(
    object: I,
  ): EndTaskRequest {
    const message = createBaseEndTaskRequest();
    message.taskId = object.taskId ?? '';
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseTransferRequest(): TransferRequest {
  return { conversationUUID: '', imUsername: undefined, userId: undefined };
}

export const TransferRequest = {
  encode(message: TransferRequest, writer: Writer = Writer.create()): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.imUsername !== undefined) {
      writer.uint32(18).string(message.imUsername);
    }
    if (message.userId !== undefined) {
      writer.uint32(24).sint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TransferRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.imUsername = reader.string();
          break;
        case 3:
          message.userId = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransferRequest {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      imUsername: isSet(object.imUsername)
        ? String(object.imUsername)
        : undefined,
      userId: isSet(object.userId) ? Number(object.userId) : undefined,
    };
  },

  toJSON(message: TransferRequest): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.imUsername !== undefined && (obj.imUsername = message.imUsername);
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransferRequest>, I>>(
    object: I,
  ): TransferRequest {
    const message = createBaseTransferRequest();
    message.conversationUUID = object.conversationUUID ?? '';
    message.imUsername = object.imUsername ?? undefined;
    message.userId = object.userId ?? undefined;
    return message;
  },
};

function createBaseSQBotCommand(): SQBotCommand {
  return {
    type: 0,
    sendMessageRequest: undefined,
    editMessageRequest: undefined,
    removeMessageRequest: undefined,
    enqueueTaskRequest: undefined,
    endTaskRequest: undefined,
    retransmitEventsRequest: undefined,
    transferRequest: undefined,
  };
}

export const SQBotCommand = {
  encode(message: SQBotCommand, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.sendMessageRequest !== undefined) {
      SendMessageRequest.encode(
        message.sendMessageRequest,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.editMessageRequest !== undefined) {
      EditMessageRequest.encode(
        message.editMessageRequest,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.removeMessageRequest !== undefined) {
      RemoveMessageRequest.encode(
        message.removeMessageRequest,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.enqueueTaskRequest !== undefined) {
      EnqueueTaskRequest.encode(
        message.enqueueTaskRequest,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.endTaskRequest !== undefined) {
      EndTaskRequest.encode(
        message.endTaskRequest,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.retransmitEventsRequest !== undefined) {
      RetransmitEventsRequest.encode(
        message.retransmitEventsRequest,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.transferRequest !== undefined) {
      TransferRequest.encode(
        message.transferRequest,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SQBotCommand {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSQBotCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.sendMessageRequest = SendMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.editMessageRequest = EditMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.removeMessageRequest = RemoveMessageRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.enqueueTaskRequest = EnqueueTaskRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.endTaskRequest = EndTaskRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 7:
          message.retransmitEventsRequest = RetransmitEventsRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 8:
          message.transferRequest = TransferRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SQBotCommand {
    return {
      type: isSet(object.type) ? botCommandTypeFromJSON(object.type) : 0,
      sendMessageRequest: isSet(object.sendMessageRequest)
        ? SendMessageRequest.fromJSON(object.sendMessageRequest)
        : undefined,
      editMessageRequest: isSet(object.editMessageRequest)
        ? EditMessageRequest.fromJSON(object.editMessageRequest)
        : undefined,
      removeMessageRequest: isSet(object.removeMessageRequest)
        ? RemoveMessageRequest.fromJSON(object.removeMessageRequest)
        : undefined,
      enqueueTaskRequest: isSet(object.enqueueTaskRequest)
        ? EnqueueTaskRequest.fromJSON(object.enqueueTaskRequest)
        : undefined,
      endTaskRequest: isSet(object.endTaskRequest)
        ? EndTaskRequest.fromJSON(object.endTaskRequest)
        : undefined,
      retransmitEventsRequest: isSet(object.retransmitEventsRequest)
        ? RetransmitEventsRequest.fromJSON(object.retransmitEventsRequest)
        : undefined,
      transferRequest: isSet(object.transferRequest)
        ? TransferRequest.fromJSON(object.transferRequest)
        : undefined,
    };
  },

  toJSON(message: SQBotCommand): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = botCommandTypeToJSON(message.type));
    message.sendMessageRequest !== undefined &&
      (obj.sendMessageRequest = message.sendMessageRequest
        ? SendMessageRequest.toJSON(message.sendMessageRequest)
        : undefined);
    message.editMessageRequest !== undefined &&
      (obj.editMessageRequest = message.editMessageRequest
        ? EditMessageRequest.toJSON(message.editMessageRequest)
        : undefined);
    message.removeMessageRequest !== undefined &&
      (obj.removeMessageRequest = message.removeMessageRequest
        ? RemoveMessageRequest.toJSON(message.removeMessageRequest)
        : undefined);
    message.enqueueTaskRequest !== undefined &&
      (obj.enqueueTaskRequest = message.enqueueTaskRequest
        ? EnqueueTaskRequest.toJSON(message.enqueueTaskRequest)
        : undefined);
    message.endTaskRequest !== undefined &&
      (obj.endTaskRequest = message.endTaskRequest
        ? EndTaskRequest.toJSON(message.endTaskRequest)
        : undefined);
    message.retransmitEventsRequest !== undefined &&
      (obj.retransmitEventsRequest = message.retransmitEventsRequest
        ? RetransmitEventsRequest.toJSON(message.retransmitEventsRequest)
        : undefined);
    message.transferRequest !== undefined &&
      (obj.transferRequest = message.transferRequest
        ? TransferRequest.toJSON(message.transferRequest)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SQBotCommand>, I>>(
    object: I,
  ): SQBotCommand {
    const message = createBaseSQBotCommand();
    message.type = object.type ?? 0;
    message.sendMessageRequest =
      object.sendMessageRequest !== undefined &&
      object.sendMessageRequest !== null
        ? SendMessageRequest.fromPartial(object.sendMessageRequest)
        : undefined;
    message.editMessageRequest =
      object.editMessageRequest !== undefined &&
      object.editMessageRequest !== null
        ? EditMessageRequest.fromPartial(object.editMessageRequest)
        : undefined;
    message.removeMessageRequest =
      object.removeMessageRequest !== undefined &&
      object.removeMessageRequest !== null
        ? RemoveMessageRequest.fromPartial(object.removeMessageRequest)
        : undefined;
    message.enqueueTaskRequest =
      object.enqueueTaskRequest !== undefined &&
      object.enqueueTaskRequest !== null
        ? EnqueueTaskRequest.fromPartial(object.enqueueTaskRequest)
        : undefined;
    message.endTaskRequest =
      object.endTaskRequest !== undefined && object.endTaskRequest !== null
        ? EndTaskRequest.fromPartial(object.endTaskRequest)
        : undefined;
    message.retransmitEventsRequest =
      object.retransmitEventsRequest !== undefined &&
      object.retransmitEventsRequest !== null
        ? RetransmitEventsRequest.fromPartial(object.retransmitEventsRequest)
        : undefined;
    message.transferRequest =
      object.transferRequest !== undefined && object.transferRequest !== null
        ? TransferRequest.fromPartial(object.transferRequest)
        : undefined;
    return message;
  },
};

function createBaseRegisterWebHookRequest(): RegisterWebHookRequest {
  return { callbackUrl: '' };
}

export const RegisterWebHookRequest = {
  encode(
    message: RegisterWebHookRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.callbackUrl !== '') {
      writer.uint32(10).string(message.callbackUrl);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegisterWebHookRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterWebHookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.callbackUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterWebHookRequest {
    return {
      callbackUrl: isSet(object.callbackUrl) ? String(object.callbackUrl) : '',
    };
  },

  toJSON(message: RegisterWebHookRequest): unknown {
    const obj: any = {};
    message.callbackUrl !== undefined &&
      (obj.callbackUrl = message.callbackUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterWebHookRequest>, I>>(
    object: I,
  ): RegisterWebHookRequest {
    const message = createBaseRegisterWebHookRequest();
    message.callbackUrl = object.callbackUrl ?? '';
    return message;
  },
};

function createBaseRegisterWebHookResponse(): RegisterWebHookResponse {
  return { uuid: '' };
}

export const RegisterWebHookResponse = {
  encode(
    message: RegisterWebHookResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegisterWebHookResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterWebHookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterWebHookResponse {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
    };
  },

  toJSON(message: RegisterWebHookResponse): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterWebHookResponse>, I>>(
    object: I,
  ): RegisterWebHookResponse {
    const message = createBaseRegisterWebHookResponse();
    message.uuid = object.uuid ?? '';
    return message;
  },
};

function createBaseUnregisterWebHookRequest(): UnregisterWebHookRequest {
  return { uuid: '' };
}

export const UnregisterWebHookRequest = {
  encode(
    message: UnregisterWebHookRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): UnregisterWebHookRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnregisterWebHookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnregisterWebHookRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
    };
  },

  toJSON(message: UnregisterWebHookRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnregisterWebHookRequest>, I>>(
    object: I,
  ): UnregisterWebHookRequest {
    const message = createBaseUnregisterWebHookRequest();
    message.uuid = object.uuid ?? '';
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
