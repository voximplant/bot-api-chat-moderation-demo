/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';
import { Struct } from './google/protobuf/struct';

export const protobufPackage = 'vox.store';

/** Request structure for the [Logon] method. */
export interface LoginRequest {
  /** Name of the Voximplant account. */
  accountName: string | undefined;
  /** Account email. */
  accountEmail: string | undefined;
  /** Account ID. */
  accountId: number | undefined;
  /** Account password. */
  accountPassword: string | undefined;
  /** Account session ID. */
  sessionId: string | undefined;
  /** Account API key. */
  apiKey: string | undefined;
}

/** Response structure for the [Login] method */
export interface LoginResponse {
  /** JWT token for authorization purposes. The token should be passed as the `Authorization` header. Example: `Authorization:Bearer <token>`. */
  jwtToken: string;
}

/** Structure that represents a participant. */
export interface Participant {
  /** User's IM unique ID. Can be retrieved via the [GetUserData] method. */
  userId: number;
  /**
   * Field that shows if a participant can write in a conversation.
   * The permission is given by default.
   */
  canWrite: boolean;
  /**
   * Field that shows if the participant can edit its own messages in a conversation.
   * The permission is given by default.
   */
  canEdit: boolean;
  /**
   * Field that shows if the participant can remove its own messages in a conversation.
   * The permission is given by default.
   */
  canRemove: boolean;
  /**
   * Field that shows if the conversation participant can manage
   * other participants in a conversation:
   * * add, remove and edit permissions
   * * add and remove participants
   *
   * If the participant has both `can_manage_participants`
   * and `is_owner` permissions, it can edit other owners.
   */
  canManageParticipants: boolean;
  /**
   * Field that shows if the participant can edit all messages
   * in a conversation.
   */
  canEditAll: boolean;
  /**
   * Field that shows if the participant can remove
   * all messages in a conversation.
   */
  canRemoveAll: boolean;
  /**
   * Field that shows if the participant is an owner.
   * There could be more than one owner in a conversation.
   *
   * If true, the participant can edit a conversation. If true and
   * `can_manage_participants` is true, the participant can
   * manage other owners.
   */
  isOwner: boolean;
}

/** Request structure for the [CreateConversation] method. */
export interface CreateConversationRequest {
  /** Title of a new conversation. Maximum length is 50 characters. */
  title: string;
  /**
   * Is a conversation direct or not.
   *
   * See the [Conversation] structure for details.
   */
  direct: boolean;
  /**
   * Is a conversation public or not.
   *
   * See the [Conversation] structure for details.
   */
  enablePublicJoin: boolean;
  /**
   * Is a conversation uber or not.
   *
   * See the [Conversation] structure for details.
   */
  uberConversation: boolean;
  /** JSON object with a custom user data. */
  customData?: { [key: string]: any };
  /** Array of the [Participant] objects. */
  participants: Participant[];
}

/** Request structure for the [EditConversation] method. */
export interface EditConversationRequest {
  /**
   * Conversation UUID. Can be retrieved via
   * the [CreateConversation] and [GetConversations] methods.
   */
  uuid: string;
  /** [Data] object. */
  data?: EditConversationRequest_Data;
}

/** Data structure. */
export interface EditConversationRequest_Data {
  /** New conversation title. */
  title: string;
  /** New value for `enable_public_join`. */
  enablePublicJoin: boolean;
  /** New JSON object with a custom user data. */
  customData?: { [key: string]: any };
}

/** Response structure for the [CreateConversation] method. */
export interface CreateConversationResponse {
  /** Conversation UUID. */
  uuid: string;
}

/** Request structure for the [GetConversations] method. */
export interface GetConversationsRequest {
  /** Array of conversation titles to search. */
  title?: string[];
  /** Is `enable_public_join` true or false. */
  enablePublicJoin?: boolean;
  /** Array of conversation UUID(s). */
  uuid?: string[];
  /** Maximum number of entries in the result. */
  count?: number;
  /** The first N records will be skipped in the output. */
  offset?: number;
}

/** Structure that represents a conversation. */
export interface Conversation {
  /** Conversation UUID. */
  uuid: string;
  /** Conversation title. */
  title: string;
  /**
   * Field that shows if a conversation is direct or not.
   *
   * There can be only 2 participants in a direct conversation
   * which is unique and the only one for these participants.
   * There can't be more than 1 direct conversation for the same 2 users.
   *
   * If one of these users tries to create a new direct conversation
   * with the same participant, the method will return
   * the UUID of the already existing direct conversation.
   *
   * A direct conversation can't be uber and/or public.
   */
  direct: boolean;
  /**
   * If true, users of both the current child account and the main
   * Voximplant developer account can join the conversation by its UUID.
   * If false, new users can be added by the conversation participants
   * with the `can_manage_participants` permission.
   */
  enablePublicJoin: boolean;
  /**
   * If true, users can see only messages which were created
   * during their participating in the conversation.
   *
   * If false, users can see all ever created messages in the conversation.
   */
  uberConversation: boolean;
  /** JSON object with a custom user data. */
  customData?: { [key: string]: any };
  /** Array of the [Participant] objects. */
  participants: Participant[];
  /** The last sequence in the conversation */
  lastSeq: number;
}

/** Response structure for the [GetConversations] method. */
export interface GetConversationsResponse {
  /** Array of the [Conversation] objects. */
  conversations: Conversation[];
}

/** Request structure for the [RemoveConversations] method. */
export interface RemoveConversationsRequest {
  /** Array of conversation UUID(s). */
  uuids: string[];
}

/** Request structure for the [GetParticipants] method. */
export interface GetParticipantsRequest {
  /** Conversation UUID. */
  uuid: string;
}

/** Response structure for the [GetParticipants] method. */
export interface GetParticipantsResponse {
  /** Array of the [Participant] objects. */
  participants: Participant[];
}

/** Request structure for the [AddParticipants] method. */
export interface AddParticipantsRequest {
  /** Conversation UUID. */
  uuid: string;
  /** Array of the [Participant] objects to add. */
  participants: Participant[];
}

/** Request structure for the [RemoveParticipants] method. */
export interface RemoveParticipantsRequest {
  /** Conversation UUID. */
  uuid: string;
  /** Array of the [Participant] ids to remove. */
  participants: number[];
}

/** Request structure for the [ManagePermission] method. */
export interface ManagePermissionsRequest {
  /** Conversation UUID. */
  uuid: string;
  /** Array of the [Participant] objects. */
  participants: Participant[];
}

/** Request structure for the [GetUserData] method. */
export interface GetUserDataRequest {
  /** Array of the [UserInfo] objects. */
  users: UserInfo[];
}

/** Structure that represents the user's identifiers. */
export interface UserInfo {
  /** User's IM unique ID. */
  userId: number;
  /**
   * Voximplant user identifier,
   * for example `username@appname.accname`.
   */
  userName: string;
}

/** Structure that represents user information. */
export interface UserData {
  /** User's IM unique ID. */
  userId: number;
  /**
   * Voximplant user identifier,
   * for example `username@appname.accname`.
   */
  userName: string;
  /**
   * Get the user's display name which is specified during user creation via
   * [the Voximplant control panel](https://manage.voximplant.com/#addUser) or [HTTP API](https://voximplant.com/docs/references/httpapi/managing_users#adduser).
   */
  displayName: string;
  /** JSON object with a custom user data. */
  customData?: { [key: string]: any };
  /**
   * JSON object with a private custom user data which
   * is available only to the current user.
   */
  privateCustomData?: { [key: string]: any };
  /** Array of UUIDs of the conversations that the user currently belongs to. */
  activeConversations: string[];
  /**
   * Get the list of UUIDs for the conversations that:
   * * the user belonged to, but currently is not participating in
   * * are not removed
   */
  leftConversations: string[];
  /** Is the user deleted or not. */
  deleted: boolean;
  voxAccountId: number;
  voxApplicationId: number;
  voxIdentityId: number;
}

/** Response structure for the [GetUserData] method. */
export interface GetUserDataResponse {
  /** Array of the [UserData] objects. */
  users: UserData[];
}

/** Request structure for the [EditUserData] method. */
export interface EditUserDataRequest {
  /** User's IM unique ID. Can be retrieved via the [GetUserData] method. */
  userId: number;
  /** [Data] object. */
  data?: EditUserDataRequest_Data;
}

/** Data structure. */
export interface EditUserDataRequest_Data {
  /** JSON object with a custom user data. */
  customData?: { [key: string]: any };
  /**
   * JSON object with a private custom user data which
   * is available only to the current user.
   */
  privateCustomData?: { [key: string]: any };
}

/** Structure that represents a message. */
export interface Message {
  /** Conversation UUID. */
  conversationUUID: string;
  /** Message UUID which is used in [EditMessageRequest]. */
  messageUUID: string;
  /** Message text. Maximum length is 5000 symbols. */
  text: string;
  /** Array of JSON objects with a custom data. */
  payload: { [key: string]: any }[];
}

export interface RetransmitEventsRequest {
  /** Conversation UUID. */
  conversationUUID: string;
  /** The top value of sequence for retransmitted events. */
  eventsTo: number;
  count: number;
}

/** Event is triggered when an income message is received */
export interface MessageReceivedEvent {
  /** Message object. */
  message?: Message;
  /** User ID of a message sender. */
  initiator: number;
  /** Receiving time in the UNIX epoch format (seconds). */
  timestamp?: Date;
  /** The sequence for event */
  sequence: number;
}

/** Event is triggered when a message in a conversation is edited. */
export interface MessageEditedEvent {
  /** Message object. */
  message?: Message;
  /** User ID of a message editor. */
  initiator: number;
  /** Modifying time in the UNIX epoch format (seconds). */
  modifiedAt?: Date;
  /** The sequence for event */
  sequence: number;
}

/** Event is triggered when a message in a conversation is removed. */
export interface MessageRemovedEvent {
  /** Message UUID. */
  messageUUID: string;
  /** Conversation UUID. */
  conversationUUID: string;
  /** User ID of a message remover. */
  initiator: number;
  /** Removing time in the UNIX epoch format (seconds). */
  removedAt?: Date;
  /** The sequence for event */
  sequence: number;
}

export interface RetransmitEvent {
  type: RetransmitEvent_Type;
  messageReceivedEvent?: MessageReceivedEvent | undefined;
  messageEditedEvent?: MessageEditedEvent | undefined;
  messageRemovedEvent?: MessageRemovedEvent | undefined;
  conversationCreatedEvent?: ConversationCreatedEvent | undefined;
  conversationEditedEvent?: ConversationEditedEvent | undefined;
}

export enum RetransmitEvent_Type {
  SendMessage = 0,
  EditMessage = 1,
  RemoveMessage = 2,
  CreateConversation = 3,
  EditConversation = 4,
  UNRECOGNIZED = -1,
}

export function retransmitEvent_TypeFromJSON(
  object: any,
): RetransmitEvent_Type {
  switch (object) {
    case 0:
    case 'SendMessage':
      return RetransmitEvent_Type.SendMessage;
    case 1:
    case 'EditMessage':
      return RetransmitEvent_Type.EditMessage;
    case 2:
    case 'RemoveMessage':
      return RetransmitEvent_Type.RemoveMessage;
    case 3:
    case 'CreateConversation':
      return RetransmitEvent_Type.CreateConversation;
    case 4:
    case 'EditConversation':
      return RetransmitEvent_Type.EditConversation;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return RetransmitEvent_Type.UNRECOGNIZED;
  }
}

export function retransmitEvent_TypeToJSON(
  object: RetransmitEvent_Type,
): string {
  switch (object) {
    case RetransmitEvent_Type.SendMessage:
      return 'SendMessage';
    case RetransmitEvent_Type.EditMessage:
      return 'EditMessage';
    case RetransmitEvent_Type.RemoveMessage:
      return 'RemoveMessage';
    case RetransmitEvent_Type.CreateConversation:
      return 'CreateConversation';
    case RetransmitEvent_Type.EditConversation:
      return 'EditConversation';
    default:
      return 'UNKNOWN';
  }
}

export interface RetransmitEventsResponse {
  /** Conversation UUID. */
  conversationUUID: string;
  messages: RetransmitEvent[];
}

/** Event is triggered when a conversation is created. */
export interface ConversationCreatedEvent {
  /** Conversation object */
  conversation?: Conversation;
  /** User ID of a conversation creator. */
  initiator: number;
}

/** Event is triggered when a conversation is modified. */
export interface ConversationEditedEvent {
  /** Conversation object. */
  conversation?: Conversation;
  /** User ID of a conversation editor. */
  initiator: number;
  /** Action type that triggered the event. */
  incomingActionType: string;
}

function createBaseLoginRequest(): LoginRequest {
  return {
    accountName: undefined,
    accountEmail: undefined,
    accountId: undefined,
    accountPassword: undefined,
    sessionId: undefined,
    apiKey: undefined,
  };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: Writer = Writer.create()): Writer {
    if (message.accountName !== undefined) {
      writer.uint32(10).string(message.accountName);
    }
    if (message.accountEmail !== undefined) {
      writer.uint32(18).string(message.accountEmail);
    }
    if (message.accountId !== undefined) {
      writer.uint32(24).int32(message.accountId);
    }
    if (message.accountPassword !== undefined) {
      writer.uint32(34).string(message.accountPassword);
    }
    if (message.sessionId !== undefined) {
      writer.uint32(42).string(message.sessionId);
    }
    if (message.apiKey !== undefined) {
      writer.uint32(50).string(message.apiKey);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountName = reader.string();
          break;
        case 2:
          message.accountEmail = reader.string();
          break;
        case 3:
          message.accountId = reader.int32();
          break;
        case 4:
          message.accountPassword = reader.string();
          break;
        case 5:
          message.sessionId = reader.string();
          break;
        case 6:
          message.apiKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      accountName: isSet(object.accountName)
        ? String(object.accountName)
        : undefined,
      accountEmail: isSet(object.accountEmail)
        ? String(object.accountEmail)
        : undefined,
      accountId: isSet(object.accountId) ? Number(object.accountId) : undefined,
      accountPassword: isSet(object.accountPassword)
        ? String(object.accountPassword)
        : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : undefined,
      apiKey: isSet(object.apiKey) ? String(object.apiKey) : undefined,
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.accountName !== undefined &&
      (obj.accountName = message.accountName);
    message.accountEmail !== undefined &&
      (obj.accountEmail = message.accountEmail);
    message.accountId !== undefined &&
      (obj.accountId = Math.round(message.accountId));
    message.accountPassword !== undefined &&
      (obj.accountPassword = message.accountPassword);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.apiKey !== undefined && (obj.apiKey = message.apiKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(
    object: I,
  ): LoginRequest {
    const message = createBaseLoginRequest();
    message.accountName = object.accountName ?? undefined;
    message.accountEmail = object.accountEmail ?? undefined;
    message.accountId = object.accountId ?? undefined;
    message.accountPassword = object.accountPassword ?? undefined;
    message.sessionId = object.sessionId ?? undefined;
    message.apiKey = object.apiKey ?? undefined;
    return message;
  },
};

function createBaseLoginResponse(): LoginResponse {
  return { jwtToken: '' };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: Writer = Writer.create()): Writer {
    if (message.jwtToken !== '') {
      writer.uint32(10).string(message.jwtToken);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.jwtToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      jwtToken: isSet(object.jwtToken) ? String(object.jwtToken) : '',
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    message.jwtToken !== undefined && (obj.jwtToken = message.jwtToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(
    object: I,
  ): LoginResponse {
    const message = createBaseLoginResponse();
    message.jwtToken = object.jwtToken ?? '';
    return message;
  },
};

function createBaseParticipant(): Participant {
  return {
    userId: 0,
    canWrite: false,
    canEdit: false,
    canRemove: false,
    canManageParticipants: false,
    canEditAll: false,
    canRemoveAll: false,
    isOwner: false,
  };
}

export const Participant = {
  encode(message: Participant, writer: Writer = Writer.create()): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).sint64(message.userId);
    }
    if (message.canWrite === true) {
      writer.uint32(16).bool(message.canWrite);
    }
    if (message.canEdit === true) {
      writer.uint32(24).bool(message.canEdit);
    }
    if (message.canRemove === true) {
      writer.uint32(32).bool(message.canRemove);
    }
    if (message.canManageParticipants === true) {
      writer.uint32(40).bool(message.canManageParticipants);
    }
    if (message.canEditAll === true) {
      writer.uint32(48).bool(message.canEditAll);
    }
    if (message.canRemoveAll === true) {
      writer.uint32(56).bool(message.canRemoveAll);
    }
    if (message.isOwner === true) {
      writer.uint32(64).bool(message.isOwner);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Participant {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.sint64() as Long);
          break;
        case 2:
          message.canWrite = reader.bool();
          break;
        case 3:
          message.canEdit = reader.bool();
          break;
        case 4:
          message.canRemove = reader.bool();
          break;
        case 5:
          message.canManageParticipants = reader.bool();
          break;
        case 6:
          message.canEditAll = reader.bool();
          break;
        case 7:
          message.canRemoveAll = reader.bool();
          break;
        case 8:
          message.isOwner = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Participant {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      canWrite: isSet(object.canWrite) ? Boolean(object.canWrite) : false,
      canEdit: isSet(object.canEdit) ? Boolean(object.canEdit) : false,
      canRemove: isSet(object.canRemove) ? Boolean(object.canRemove) : false,
      canManageParticipants: isSet(object.canManageParticipants)
        ? Boolean(object.canManageParticipants)
        : false,
      canEditAll: isSet(object.canEditAll) ? Boolean(object.canEditAll) : false,
      canRemoveAll: isSet(object.canRemoveAll)
        ? Boolean(object.canRemoveAll)
        : false,
      isOwner: isSet(object.isOwner) ? Boolean(object.isOwner) : false,
    };
  },

  toJSON(message: Participant): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.canWrite !== undefined && (obj.canWrite = message.canWrite);
    message.canEdit !== undefined && (obj.canEdit = message.canEdit);
    message.canRemove !== undefined && (obj.canRemove = message.canRemove);
    message.canManageParticipants !== undefined &&
      (obj.canManageParticipants = message.canManageParticipants);
    message.canEditAll !== undefined && (obj.canEditAll = message.canEditAll);
    message.canRemoveAll !== undefined &&
      (obj.canRemoveAll = message.canRemoveAll);
    message.isOwner !== undefined && (obj.isOwner = message.isOwner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Participant>, I>>(
    object: I,
  ): Participant {
    const message = createBaseParticipant();
    message.userId = object.userId ?? 0;
    message.canWrite = object.canWrite ?? false;
    message.canEdit = object.canEdit ?? false;
    message.canRemove = object.canRemove ?? false;
    message.canManageParticipants = object.canManageParticipants ?? false;
    message.canEditAll = object.canEditAll ?? false;
    message.canRemoveAll = object.canRemoveAll ?? false;
    message.isOwner = object.isOwner ?? false;
    return message;
  },
};

function createBaseCreateConversationRequest(): CreateConversationRequest {
  return {
    title: '',
    direct: false,
    enablePublicJoin: false,
    uberConversation: false,
    customData: undefined,
    participants: [],
  };
}

export const CreateConversationRequest = {
  encode(
    message: CreateConversationRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title);
    }
    if (message.direct === true) {
      writer.uint32(16).bool(message.direct);
    }
    if (message.enablePublicJoin === true) {
      writer.uint32(24).bool(message.enablePublicJoin);
    }
    if (message.uberConversation === true) {
      writer.uint32(32).bool(message.uberConversation);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(42).fork(),
      ).ldelim();
    }
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): CreateConversationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConversationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.direct = reader.bool();
          break;
        case 3:
          message.enablePublicJoin = reader.bool();
          break;
        case 4:
          message.uberConversation = reader.bool();
          break;
        case 5:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 6:
          message.participants.push(
            Participant.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateConversationRequest {
    return {
      title: isSet(object.title) ? String(object.title) : '',
      direct: isSet(object.direct) ? Boolean(object.direct) : false,
      enablePublicJoin: isSet(object.enablePublicJoin)
        ? Boolean(object.enablePublicJoin)
        : false,
      uberConversation: isSet(object.uberConversation)
        ? Boolean(object.uberConversation)
        : false,
      customData: isObject(object.customData) ? object.customData : undefined,
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateConversationRequest): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.direct !== undefined && (obj.direct = message.direct);
    message.enablePublicJoin !== undefined &&
      (obj.enablePublicJoin = message.enablePublicJoin);
    message.uberConversation !== undefined &&
      (obj.uberConversation = message.uberConversation);
    message.customData !== undefined && (obj.customData = message.customData);
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined,
      );
    } else {
      obj.participants = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateConversationRequest>, I>>(
    object: I,
  ): CreateConversationRequest {
    const message = createBaseCreateConversationRequest();
    message.title = object.title ?? '';
    message.direct = object.direct ?? false;
    message.enablePublicJoin = object.enablePublicJoin ?? false;
    message.uberConversation = object.uberConversation ?? false;
    message.customData = object.customData ?? undefined;
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEditConversationRequest(): EditConversationRequest {
  return { uuid: '', data: undefined };
}

export const EditConversationRequest = {
  encode(
    message: EditConversationRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    if (message.data !== undefined) {
      EditConversationRequest_Data.encode(
        message.data,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EditConversationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditConversationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.data = EditConversationRequest_Data.decode(
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

  fromJSON(object: any): EditConversationRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
      data: isSet(object.data)
        ? EditConversationRequest_Data.fromJSON(object.data)
        : undefined,
    };
  },

  toJSON(message: EditConversationRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.data !== undefined &&
      (obj.data = message.data
        ? EditConversationRequest_Data.toJSON(message.data)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditConversationRequest>, I>>(
    object: I,
  ): EditConversationRequest {
    const message = createBaseEditConversationRequest();
    message.uuid = object.uuid ?? '';
    message.data =
      object.data !== undefined && object.data !== null
        ? EditConversationRequest_Data.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseEditConversationRequest_Data(): EditConversationRequest_Data {
  return { title: '', enablePublicJoin: false, customData: undefined };
}

export const EditConversationRequest_Data = {
  encode(
    message: EditConversationRequest_Data,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title);
    }
    if (message.enablePublicJoin === true) {
      writer.uint32(16).bool(message.enablePublicJoin);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): EditConversationRequest_Data {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditConversationRequest_Data();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.enablePublicJoin = reader.bool();
          break;
        case 3:
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

  fromJSON(object: any): EditConversationRequest_Data {
    return {
      title: isSet(object.title) ? String(object.title) : '',
      enablePublicJoin: isSet(object.enablePublicJoin)
        ? Boolean(object.enablePublicJoin)
        : false,
      customData: isObject(object.customData) ? object.customData : undefined,
    };
  },

  toJSON(message: EditConversationRequest_Data): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.enablePublicJoin !== undefined &&
      (obj.enablePublicJoin = message.enablePublicJoin);
    message.customData !== undefined && (obj.customData = message.customData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditConversationRequest_Data>, I>>(
    object: I,
  ): EditConversationRequest_Data {
    const message = createBaseEditConversationRequest_Data();
    message.title = object.title ?? '';
    message.enablePublicJoin = object.enablePublicJoin ?? false;
    message.customData = object.customData ?? undefined;
    return message;
  },
};

function createBaseCreateConversationResponse(): CreateConversationResponse {
  return { uuid: '' };
}

export const CreateConversationResponse = {
  encode(
    message: CreateConversationResponse,
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
  ): CreateConversationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConversationResponse();
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

  fromJSON(object: any): CreateConversationResponse {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
    };
  },

  toJSON(message: CreateConversationResponse): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateConversationResponse>, I>>(
    object: I,
  ): CreateConversationResponse {
    const message = createBaseCreateConversationResponse();
    message.uuid = object.uuid ?? '';
    return message;
  },
};

function createBaseGetConversationsRequest(): GetConversationsRequest {
  return { title: [], enablePublicJoin: false, uuid: [], count: 0, offset: 0 };
}

export const GetConversationsRequest = {
  encode(
    message: GetConversationsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.title) {
      writer.uint32(10).string(v!);
    }
    if (message.enablePublicJoin === true) {
      writer.uint32(16).bool(message.enablePublicJoin);
    }
    for (const v of message.uuid) {
      writer.uint32(26).string(v!);
    }
    if (message.count !== 0) {
      writer.uint32(80).int32(message.count);
    }
    if (message.offset !== 0) {
      writer.uint32(88).int32(message.offset);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetConversationsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConversationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title.push(reader.string());
          break;
        case 2:
          message.enablePublicJoin = reader.bool();
          break;
        case 3:
          message.uuid.push(reader.string());
          break;
        case 10:
          message.count = reader.int32();
          break;
        case 11:
          message.offset = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetConversationsRequest {
    return {
      title: Array.isArray(object?.title)
        ? object.title.map((e: any) => String(e))
        : [],
      enablePublicJoin: isSet(object.enablePublicJoin)
        ? Boolean(object.enablePublicJoin)
        : false,
      uuid: Array.isArray(object?.uuid)
        ? object.uuid.map((e: any) => String(e))
        : [],
      count: isSet(object.count) ? Number(object.count) : 0,
      offset: isSet(object.offset) ? Number(object.offset) : 0,
    };
  },

  toJSON(message: GetConversationsRequest): unknown {
    const obj: any = {};
    if (message.title) {
      obj.title = message.title.map((e) => e);
    } else {
      obj.title = [];
    }
    message.enablePublicJoin !== undefined &&
      (obj.enablePublicJoin = message.enablePublicJoin);
    if (message.uuid) {
      obj.uuid = message.uuid.map((e) => e);
    } else {
      obj.uuid = [];
    }
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetConversationsRequest>, I>>(
    object: I,
  ): GetConversationsRequest {
    const message = createBaseGetConversationsRequest();
    message.title = object.title?.map((e) => e) || [];
    message.enablePublicJoin = object.enablePublicJoin ?? false;
    message.uuid = object.uuid?.map((e) => e) || [];
    message.count = object.count ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseConversation(): Conversation {
  return {
    uuid: '',
    title: '',
    direct: false,
    enablePublicJoin: false,
    uberConversation: false,
    customData: undefined,
    participants: [],
    lastSeq: 0,
  };
}

export const Conversation = {
  encode(message: Conversation, writer: Writer = Writer.create()): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    if (message.title !== '') {
      writer.uint32(18).string(message.title);
    }
    if (message.direct === true) {
      writer.uint32(24).bool(message.direct);
    }
    if (message.enablePublicJoin === true) {
      writer.uint32(32).bool(message.enablePublicJoin);
    }
    if (message.uberConversation === true) {
      writer.uint32(40).bool(message.uberConversation);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(50).fork(),
      ).ldelim();
    }
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.lastSeq !== 0) {
      writer.uint32(64).sint64(message.lastSeq);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Conversation {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.direct = reader.bool();
          break;
        case 4:
          message.enablePublicJoin = reader.bool();
          break;
        case 5:
          message.uberConversation = reader.bool();
          break;
        case 6:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 7:
          message.participants.push(
            Participant.decode(reader, reader.uint32()),
          );
          break;
        case 8:
          message.lastSeq = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Conversation {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
      title: isSet(object.title) ? String(object.title) : '',
      direct: isSet(object.direct) ? Boolean(object.direct) : false,
      enablePublicJoin: isSet(object.enablePublicJoin)
        ? Boolean(object.enablePublicJoin)
        : false,
      uberConversation: isSet(object.uberConversation)
        ? Boolean(object.uberConversation)
        : false,
      customData: isObject(object.customData) ? object.customData : undefined,
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
      lastSeq: isSet(object.lastSeq) ? Number(object.lastSeq) : 0,
    };
  },

  toJSON(message: Conversation): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.title !== undefined && (obj.title = message.title);
    message.direct !== undefined && (obj.direct = message.direct);
    message.enablePublicJoin !== undefined &&
      (obj.enablePublicJoin = message.enablePublicJoin);
    message.uberConversation !== undefined &&
      (obj.uberConversation = message.uberConversation);
    message.customData !== undefined && (obj.customData = message.customData);
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined,
      );
    } else {
      obj.participants = [];
    }
    message.lastSeq !== undefined &&
      (obj.lastSeq = Math.round(message.lastSeq));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Conversation>, I>>(
    object: I,
  ): Conversation {
    const message = createBaseConversation();
    message.uuid = object.uuid ?? '';
    message.title = object.title ?? '';
    message.direct = object.direct ?? false;
    message.enablePublicJoin = object.enablePublicJoin ?? false;
    message.uberConversation = object.uberConversation ?? false;
    message.customData = object.customData ?? undefined;
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    message.lastSeq = object.lastSeq ?? 0;
    return message;
  },
};

function createBaseGetConversationsResponse(): GetConversationsResponse {
  return { conversations: [] };
}

export const GetConversationsResponse = {
  encode(
    message: GetConversationsResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.conversations) {
      Conversation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): GetConversationsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConversationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversations.push(
            Conversation.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetConversationsResponse {
    return {
      conversations: Array.isArray(object?.conversations)
        ? object.conversations.map((e: any) => Conversation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetConversationsResponse): unknown {
    const obj: any = {};
    if (message.conversations) {
      obj.conversations = message.conversations.map((e) =>
        e ? Conversation.toJSON(e) : undefined,
      );
    } else {
      obj.conversations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetConversationsResponse>, I>>(
    object: I,
  ): GetConversationsResponse {
    const message = createBaseGetConversationsResponse();
    message.conversations =
      object.conversations?.map((e) => Conversation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveConversationsRequest(): RemoveConversationsRequest {
  return { uuids: [] };
}

export const RemoveConversationsRequest = {
  encode(
    message: RemoveConversationsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.uuids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): RemoveConversationsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveConversationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveConversationsRequest {
    return {
      uuids: Array.isArray(object?.uuids)
        ? object.uuids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: RemoveConversationsRequest): unknown {
    const obj: any = {};
    if (message.uuids) {
      obj.uuids = message.uuids.map((e) => e);
    } else {
      obj.uuids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveConversationsRequest>, I>>(
    object: I,
  ): RemoveConversationsRequest {
    const message = createBaseRemoveConversationsRequest();
    message.uuids = object.uuids?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetParticipantsRequest(): GetParticipantsRequest {
  return { uuid: '' };
}

export const GetParticipantsRequest = {
  encode(
    message: GetParticipantsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetParticipantsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParticipantsRequest();
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

  fromJSON(object: any): GetParticipantsRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
    };
  },

  toJSON(message: GetParticipantsRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetParticipantsRequest>, I>>(
    object: I,
  ): GetParticipantsRequest {
    const message = createBaseGetParticipantsRequest();
    message.uuid = object.uuid ?? '';
    return message;
  },
};

function createBaseGetParticipantsResponse(): GetParticipantsResponse {
  return { participants: [] };
}

export const GetParticipantsResponse = {
  encode(
    message: GetParticipantsResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetParticipantsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParticipantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participants.push(
            Participant.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetParticipantsResponse {
    return {
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetParticipantsResponse): unknown {
    const obj: any = {};
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined,
      );
    } else {
      obj.participants = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetParticipantsResponse>, I>>(
    object: I,
  ): GetParticipantsResponse {
    const message = createBaseGetParticipantsResponse();
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddParticipantsRequest(): AddParticipantsRequest {
  return { uuid: '', participants: [] };
}

export const AddParticipantsRequest = {
  encode(
    message: AddParticipantsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddParticipantsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddParticipantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.participants.push(
            Participant.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddParticipantsRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddParticipantsRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined,
      );
    } else {
      obj.participants = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddParticipantsRequest>, I>>(
    object: I,
  ): AddParticipantsRequest {
    const message = createBaseAddParticipantsRequest();
    message.uuid = object.uuid ?? '';
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveParticipantsRequest(): RemoveParticipantsRequest {
  return { uuid: '', participants: [] };
}

export const RemoveParticipantsRequest = {
  encode(
    message: RemoveParticipantsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    writer.uint32(18).fork();
    for (const v of message.participants) {
      writer.sint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): RemoveParticipantsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveParticipantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.participants.push(longToNumber(reader.sint64() as Long));
            }
          } else {
            message.participants.push(longToNumber(reader.sint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveParticipantsRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: RemoveParticipantsRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    if (message.participants) {
      obj.participants = message.participants.map((e) => Math.round(e));
    } else {
      obj.participants = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveParticipantsRequest>, I>>(
    object: I,
  ): RemoveParticipantsRequest {
    const message = createBaseRemoveParticipantsRequest();
    message.uuid = object.uuid ?? '';
    message.participants = object.participants?.map((e) => e) || [];
    return message;
  },
};

function createBaseManagePermissionsRequest(): ManagePermissionsRequest {
  return { uuid: '', participants: [] };
}

export const ManagePermissionsRequest = {
  encode(
    message: ManagePermissionsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.uuid !== '') {
      writer.uint32(10).string(message.uuid);
    }
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): ManagePermissionsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagePermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.participants.push(
            Participant.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagePermissionsRequest {
    return {
      uuid: isSet(object.uuid) ? String(object.uuid) : '',
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ManagePermissionsRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined,
      );
    } else {
      obj.participants = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagePermissionsRequest>, I>>(
    object: I,
  ): ManagePermissionsRequest {
    const message = createBaseManagePermissionsRequest();
    message.uuid = object.uuid ?? '';
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetUserDataRequest(): GetUserDataRequest {
  return { users: [] };
}

export const GetUserDataRequest = {
  encode(
    message: GetUserDataRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.users) {
      UserInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetUserDataRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(UserInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserDataRequest {
    return {
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => UserInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetUserDataRequest): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) =>
        e ? UserInfo.toJSON(e) : undefined,
      );
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserDataRequest>, I>>(
    object: I,
  ): GetUserDataRequest {
    const message = createBaseGetUserDataRequest();
    message.users = object.users?.map((e) => UserInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserInfo(): UserInfo {
  return { userId: 0, userName: '' };
}

export const UserInfo = {
  encode(message: UserInfo, writer: Writer = Writer.create()): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).sint64(message.userId);
    }
    if (message.userName !== '') {
      writer.uint32(18).string(message.userName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UserInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.sint64() as Long);
          break;
        case 2:
          message.userName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserInfo {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      userName: isSet(object.userName) ? String(object.userName) : '',
    };
  },

  toJSON(message: UserInfo): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.userName !== undefined && (obj.userName = message.userName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserInfo>, I>>(object: I): UserInfo {
    const message = createBaseUserInfo();
    message.userId = object.userId ?? 0;
    message.userName = object.userName ?? '';
    return message;
  },
};

function createBaseUserData(): UserData {
  return {
    userId: 0,
    userName: '',
    displayName: '',
    customData: undefined,
    privateCustomData: undefined,
    activeConversations: [],
    leftConversations: [],
    deleted: false,
    voxAccountId: 0,
    voxApplicationId: 0,
    voxIdentityId: 0,
  };
}

export const UserData = {
  encode(message: UserData, writer: Writer = Writer.create()): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).sint64(message.userId);
    }
    if (message.userName !== '') {
      writer.uint32(18).string(message.userName);
    }
    if (message.displayName !== '') {
      writer.uint32(26).string(message.displayName);
    }
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.privateCustomData !== undefined) {
      Struct.encode(
        Struct.wrap(message.privateCustomData),
        writer.uint32(42).fork(),
      ).ldelim();
    }
    for (const v of message.activeConversations) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.leftConversations) {
      writer.uint32(58).string(v!);
    }
    if (message.deleted === true) {
      writer.uint32(64).bool(message.deleted);
    }
    if (message.voxAccountId !== 0) {
      writer.uint32(72).sint64(message.voxAccountId);
    }
    if (message.voxApplicationId !== 0) {
      writer.uint32(80).sint64(message.voxApplicationId);
    }
    if (message.voxIdentityId !== 0) {
      writer.uint32(88).sint64(message.voxIdentityId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UserData {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.sint64() as Long);
          break;
        case 2:
          message.userName = reader.string();
          break;
        case 3:
          message.displayName = reader.string();
          break;
        case 4:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 5:
          message.privateCustomData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 6:
          message.activeConversations.push(reader.string());
          break;
        case 7:
          message.leftConversations.push(reader.string());
          break;
        case 8:
          message.deleted = reader.bool();
          break;
        case 9:
          message.voxAccountId = longToNumber(reader.sint64() as Long);
          break;
        case 10:
          message.voxApplicationId = longToNumber(reader.sint64() as Long);
          break;
        case 11:
          message.voxIdentityId = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserData {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      userName: isSet(object.userName) ? String(object.userName) : '',
      displayName: isSet(object.displayName) ? String(object.displayName) : '',
      customData: isObject(object.customData) ? object.customData : undefined,
      privateCustomData: isObject(object.privateCustomData)
        ? object.privateCustomData
        : undefined,
      activeConversations: Array.isArray(object?.activeConversations)
        ? object.activeConversations.map((e: any) => String(e))
        : [],
      leftConversations: Array.isArray(object?.leftConversations)
        ? object.leftConversations.map((e: any) => String(e))
        : [],
      deleted: isSet(object.deleted) ? Boolean(object.deleted) : false,
      voxAccountId: isSet(object.voxAccountId)
        ? Number(object.voxAccountId)
        : 0,
      voxApplicationId: isSet(object.voxApplicationId)
        ? Number(object.voxApplicationId)
        : 0,
      voxIdentityId: isSet(object.voxIdentityId)
        ? Number(object.voxIdentityId)
        : 0,
    };
  },

  toJSON(message: UserData): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.userName !== undefined && (obj.userName = message.userName);
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.customData !== undefined && (obj.customData = message.customData);
    message.privateCustomData !== undefined &&
      (obj.privateCustomData = message.privateCustomData);
    if (message.activeConversations) {
      obj.activeConversations = message.activeConversations.map((e) => e);
    } else {
      obj.activeConversations = [];
    }
    if (message.leftConversations) {
      obj.leftConversations = message.leftConversations.map((e) => e);
    } else {
      obj.leftConversations = [];
    }
    message.deleted !== undefined && (obj.deleted = message.deleted);
    message.voxAccountId !== undefined &&
      (obj.voxAccountId = Math.round(message.voxAccountId));
    message.voxApplicationId !== undefined &&
      (obj.voxApplicationId = Math.round(message.voxApplicationId));
    message.voxIdentityId !== undefined &&
      (obj.voxIdentityId = Math.round(message.voxIdentityId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserData>, I>>(object: I): UserData {
    const message = createBaseUserData();
    message.userId = object.userId ?? 0;
    message.userName = object.userName ?? '';
    message.displayName = object.displayName ?? '';
    message.customData = object.customData ?? undefined;
    message.privateCustomData = object.privateCustomData ?? undefined;
    message.activeConversations =
      object.activeConversations?.map((e) => e) || [];
    message.leftConversations = object.leftConversations?.map((e) => e) || [];
    message.deleted = object.deleted ?? false;
    message.voxAccountId = object.voxAccountId ?? 0;
    message.voxApplicationId = object.voxApplicationId ?? 0;
    message.voxIdentityId = object.voxIdentityId ?? 0;
    return message;
  },
};

function createBaseGetUserDataResponse(): GetUserDataResponse {
  return { users: [] };
}

export const GetUserDataResponse = {
  encode(
    message: GetUserDataResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    for (const v of message.users) {
      UserData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetUserDataResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(UserData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserDataResponse {
    return {
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => UserData.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetUserDataResponse): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) =>
        e ? UserData.toJSON(e) : undefined,
      );
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserDataResponse>, I>>(
    object: I,
  ): GetUserDataResponse {
    const message = createBaseGetUserDataResponse();
    message.users = object.users?.map((e) => UserData.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEditUserDataRequest(): EditUserDataRequest {
  return { userId: 0, data: undefined };
}

export const EditUserDataRequest = {
  encode(
    message: EditUserDataRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).sint64(message.userId);
    }
    if (message.data !== undefined) {
      EditUserDataRequest_Data.encode(
        message.data,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EditUserDataRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.sint64() as Long);
          break;
        case 2:
          message.data = EditUserDataRequest_Data.decode(
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

  fromJSON(object: any): EditUserDataRequest {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      data: isSet(object.data)
        ? EditUserDataRequest_Data.fromJSON(object.data)
        : undefined,
    };
  },

  toJSON(message: EditUserDataRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.data !== undefined &&
      (obj.data = message.data
        ? EditUserDataRequest_Data.toJSON(message.data)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditUserDataRequest>, I>>(
    object: I,
  ): EditUserDataRequest {
    const message = createBaseEditUserDataRequest();
    message.userId = object.userId ?? 0;
    message.data =
      object.data !== undefined && object.data !== null
        ? EditUserDataRequest_Data.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseEditUserDataRequest_Data(): EditUserDataRequest_Data {
  return { customData: undefined, privateCustomData: undefined };
}

export const EditUserDataRequest_Data = {
  encode(
    message: EditUserDataRequest_Data,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.customData !== undefined) {
      Struct.encode(
        Struct.wrap(message.customData),
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.privateCustomData !== undefined) {
      Struct.encode(
        Struct.wrap(message.privateCustomData),
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): EditUserDataRequest_Data {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditUserDataRequest_Data();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.customData = Struct.unwrap(
            Struct.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.privateCustomData = Struct.unwrap(
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

  fromJSON(object: any): EditUserDataRequest_Data {
    return {
      customData: isObject(object.customData) ? object.customData : undefined,
      privateCustomData: isObject(object.privateCustomData)
        ? object.privateCustomData
        : undefined,
    };
  },

  toJSON(message: EditUserDataRequest_Data): unknown {
    const obj: any = {};
    message.customData !== undefined && (obj.customData = message.customData);
    message.privateCustomData !== undefined &&
      (obj.privateCustomData = message.privateCustomData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditUserDataRequest_Data>, I>>(
    object: I,
  ): EditUserDataRequest_Data {
    const message = createBaseEditUserDataRequest_Data();
    message.customData = object.customData ?? undefined;
    message.privateCustomData = object.privateCustomData ?? undefined;
    return message;
  },
};

function createBaseMessage(): Message {
  return { conversationUUID: '', messageUUID: '', text: '', payload: [] };
}

export const Message = {
  encode(message: Message, writer: Writer = Writer.create()): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.messageUUID !== '') {
      writer.uint32(18).string(message.messageUUID);
    }
    if (message.text !== '') {
      writer.uint32(26).string(message.text);
    }
    for (const v of message.payload) {
      Struct.encode(Struct.wrap(v!), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
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
          message.text = reader.string();
          break;
        case 4:
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

  fromJSON(object: any): Message {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      messageUUID: isSet(object.messageUUID) ? String(object.messageUUID) : '',
      text: isSet(object.text) ? String(object.text) : '',
      payload: Array.isArray(object?.payload) ? [...object.payload] : [],
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.messageUUID !== undefined &&
      (obj.messageUUID = message.messageUUID);
    message.text !== undefined && (obj.text = message.text);
    if (message.payload) {
      obj.payload = message.payload.map((e) => e);
    } else {
      obj.payload = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.conversationUUID = object.conversationUUID ?? '';
    message.messageUUID = object.messageUUID ?? '';
    message.text = object.text ?? '';
    message.payload = object.payload?.map((e) => e) || [];
    return message;
  },
};

function createBaseRetransmitEventsRequest(): RetransmitEventsRequest {
  return { conversationUUID: '', eventsTo: 0, count: 0 };
}

export const RetransmitEventsRequest = {
  encode(
    message: RetransmitEventsRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    if (message.eventsTo !== 0) {
      writer.uint32(16).sint64(message.eventsTo);
    }
    if (message.count !== 0) {
      writer.uint32(24).sint32(message.count);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RetransmitEventsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetransmitEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.eventsTo = longToNumber(reader.sint64() as Long);
          break;
        case 3:
          message.count = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetransmitEventsRequest {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      eventsTo: isSet(object.eventsTo) ? Number(object.eventsTo) : 0,
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: RetransmitEventsRequest): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.eventsTo !== undefined &&
      (obj.eventsTo = Math.round(message.eventsTo));
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetransmitEventsRequest>, I>>(
    object: I,
  ): RetransmitEventsRequest {
    const message = createBaseRetransmitEventsRequest();
    message.conversationUUID = object.conversationUUID ?? '';
    message.eventsTo = object.eventsTo ?? 0;
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseMessageReceivedEvent(): MessageReceivedEvent {
  return {
    message: undefined,
    initiator: 0,
    timestamp: undefined,
    sequence: 0,
  };
}

export const MessageReceivedEvent = {
  encode(
    message: MessageReceivedEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    if (message.initiator !== 0) {
      writer.uint32(16).sint64(message.initiator);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(32).sint64(message.sequence);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MessageReceivedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageReceivedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        case 2:
          message.initiator = longToNumber(reader.sint64() as Long);
          break;
        case 3:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.sequence = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageReceivedEvent {
    return {
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
      initiator: isSet(object.initiator) ? Number(object.initiator) : 0,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: MessageReceivedEvent): unknown {
    const obj: any = {};
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    message.initiator !== undefined &&
      (obj.initiator = Math.round(message.initiator));
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.sequence !== undefined &&
      (obj.sequence = Math.round(message.sequence));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageReceivedEvent>, I>>(
    object: I,
  ): MessageReceivedEvent {
    const message = createBaseMessageReceivedEvent();
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    message.initiator = object.initiator ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseMessageEditedEvent(): MessageEditedEvent {
  return {
    message: undefined,
    initiator: 0,
    modifiedAt: undefined,
    sequence: 0,
  };
}

export const MessageEditedEvent = {
  encode(
    message: MessageEditedEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    if (message.initiator !== 0) {
      writer.uint32(16).sint64(message.initiator);
    }
    if (message.modifiedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.modifiedAt),
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(32).sint64(message.sequence);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MessageEditedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageEditedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        case 2:
          message.initiator = longToNumber(reader.sint64() as Long);
          break;
        case 3:
          message.modifiedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.sequence = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageEditedEvent {
    return {
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
      initiator: isSet(object.initiator) ? Number(object.initiator) : 0,
      modifiedAt: isSet(object.modifiedAt)
        ? fromJsonTimestamp(object.modifiedAt)
        : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: MessageEditedEvent): unknown {
    const obj: any = {};
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    message.initiator !== undefined &&
      (obj.initiator = Math.round(message.initiator));
    message.modifiedAt !== undefined &&
      (obj.modifiedAt = message.modifiedAt.toISOString());
    message.sequence !== undefined &&
      (obj.sequence = Math.round(message.sequence));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageEditedEvent>, I>>(
    object: I,
  ): MessageEditedEvent {
    const message = createBaseMessageEditedEvent();
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    message.initiator = object.initiator ?? 0;
    message.modifiedAt = object.modifiedAt ?? undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseMessageRemovedEvent(): MessageRemovedEvent {
  return {
    messageUUID: '',
    conversationUUID: '',
    initiator: 0,
    removedAt: undefined,
    sequence: 0,
  };
}

export const MessageRemovedEvent = {
  encode(
    message: MessageRemovedEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.messageUUID !== '') {
      writer.uint32(10).string(message.messageUUID);
    }
    if (message.conversationUUID !== '') {
      writer.uint32(18).string(message.conversationUUID);
    }
    if (message.initiator !== 0) {
      writer.uint32(24).sint64(message.initiator);
    }
    if (message.removedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.removedAt),
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(40).sint64(message.sequence);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MessageRemovedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRemovedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageUUID = reader.string();
          break;
        case 2:
          message.conversationUUID = reader.string();
          break;
        case 3:
          message.initiator = longToNumber(reader.sint64() as Long);
          break;
        case 4:
          message.removedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          break;
        case 5:
          message.sequence = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageRemovedEvent {
    return {
      messageUUID: isSet(object.messageUUID) ? String(object.messageUUID) : '',
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      initiator: isSet(object.initiator) ? Number(object.initiator) : 0,
      removedAt: isSet(object.removedAt)
        ? fromJsonTimestamp(object.removedAt)
        : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: MessageRemovedEvent): unknown {
    const obj: any = {};
    message.messageUUID !== undefined &&
      (obj.messageUUID = message.messageUUID);
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    message.initiator !== undefined &&
      (obj.initiator = Math.round(message.initiator));
    message.removedAt !== undefined &&
      (obj.removedAt = message.removedAt.toISOString());
    message.sequence !== undefined &&
      (obj.sequence = Math.round(message.sequence));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageRemovedEvent>, I>>(
    object: I,
  ): MessageRemovedEvent {
    const message = createBaseMessageRemovedEvent();
    message.messageUUID = object.messageUUID ?? '';
    message.conversationUUID = object.conversationUUID ?? '';
    message.initiator = object.initiator ?? 0;
    message.removedAt = object.removedAt ?? undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseRetransmitEvent(): RetransmitEvent {
  return {
    type: 0,
    messageReceivedEvent: undefined,
    messageEditedEvent: undefined,
    messageRemovedEvent: undefined,
    conversationCreatedEvent: undefined,
    conversationEditedEvent: undefined,
  };
}

export const RetransmitEvent = {
  encode(message: RetransmitEvent, writer: Writer = Writer.create()): Writer {
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
    if (message.conversationCreatedEvent !== undefined) {
      ConversationCreatedEvent.encode(
        message.conversationCreatedEvent,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.conversationEditedEvent !== undefined) {
      ConversationEditedEvent.encode(
        message.conversationEditedEvent,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RetransmitEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetransmitEvent();
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
          message.conversationCreatedEvent = ConversationCreatedEvent.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.conversationEditedEvent = ConversationEditedEvent.decode(
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

  fromJSON(object: any): RetransmitEvent {
    return {
      type: isSet(object.type) ? retransmitEvent_TypeFromJSON(object.type) : 0,
      messageReceivedEvent: isSet(object.messageReceivedEvent)
        ? MessageReceivedEvent.fromJSON(object.messageReceivedEvent)
        : undefined,
      messageEditedEvent: isSet(object.messageEditedEvent)
        ? MessageEditedEvent.fromJSON(object.messageEditedEvent)
        : undefined,
      messageRemovedEvent: isSet(object.messageRemovedEvent)
        ? MessageRemovedEvent.fromJSON(object.messageRemovedEvent)
        : undefined,
      conversationCreatedEvent: isSet(object.conversationCreatedEvent)
        ? ConversationCreatedEvent.fromJSON(object.conversationCreatedEvent)
        : undefined,
      conversationEditedEvent: isSet(object.conversationEditedEvent)
        ? ConversationEditedEvent.fromJSON(object.conversationEditedEvent)
        : undefined,
    };
  },

  toJSON(message: RetransmitEvent): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = retransmitEvent_TypeToJSON(message.type));
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
    message.conversationCreatedEvent !== undefined &&
      (obj.conversationCreatedEvent = message.conversationCreatedEvent
        ? ConversationCreatedEvent.toJSON(message.conversationCreatedEvent)
        : undefined);
    message.conversationEditedEvent !== undefined &&
      (obj.conversationEditedEvent = message.conversationEditedEvent
        ? ConversationEditedEvent.toJSON(message.conversationEditedEvent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetransmitEvent>, I>>(
    object: I,
  ): RetransmitEvent {
    const message = createBaseRetransmitEvent();
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
    message.conversationCreatedEvent =
      object.conversationCreatedEvent !== undefined &&
      object.conversationCreatedEvent !== null
        ? ConversationCreatedEvent.fromPartial(object.conversationCreatedEvent)
        : undefined;
    message.conversationEditedEvent =
      object.conversationEditedEvent !== undefined &&
      object.conversationEditedEvent !== null
        ? ConversationEditedEvent.fromPartial(object.conversationEditedEvent)
        : undefined;
    return message;
  },
};

function createBaseRetransmitEventsResponse(): RetransmitEventsResponse {
  return { conversationUUID: '', messages: [] };
}

export const RetransmitEventsResponse = {
  encode(
    message: RetransmitEventsResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversationUUID !== '') {
      writer.uint32(10).string(message.conversationUUID);
    }
    for (const v of message.messages) {
      RetransmitEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): RetransmitEventsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetransmitEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversationUUID = reader.string();
          break;
        case 2:
          message.messages.push(
            RetransmitEvent.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetransmitEventsResponse {
    return {
      conversationUUID: isSet(object.conversationUUID)
        ? String(object.conversationUUID)
        : '',
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => RetransmitEvent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RetransmitEventsResponse): unknown {
    const obj: any = {};
    message.conversationUUID !== undefined &&
      (obj.conversationUUID = message.conversationUUID);
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? RetransmitEvent.toJSON(e) : undefined,
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetransmitEventsResponse>, I>>(
    object: I,
  ): RetransmitEventsResponse {
    const message = createBaseRetransmitEventsResponse();
    message.conversationUUID = object.conversationUUID ?? '';
    message.messages =
      object.messages?.map((e) => RetransmitEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseConversationCreatedEvent(): ConversationCreatedEvent {
  return { conversation: undefined, initiator: 0 };
}

export const ConversationCreatedEvent = {
  encode(
    message: ConversationCreatedEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversation !== undefined) {
      Conversation.encode(
        message.conversation,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.initiator !== 0) {
      writer.uint32(16).sint64(message.initiator);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): ConversationCreatedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversation = Conversation.decode(reader, reader.uint32());
          break;
        case 2:
          message.initiator = longToNumber(reader.sint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConversationCreatedEvent {
    return {
      conversation: isSet(object.conversation)
        ? Conversation.fromJSON(object.conversation)
        : undefined,
      initiator: isSet(object.initiator) ? Number(object.initiator) : 0,
    };
  },

  toJSON(message: ConversationCreatedEvent): unknown {
    const obj: any = {};
    message.conversation !== undefined &&
      (obj.conversation = message.conversation
        ? Conversation.toJSON(message.conversation)
        : undefined);
    message.initiator !== undefined &&
      (obj.initiator = Math.round(message.initiator));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConversationCreatedEvent>, I>>(
    object: I,
  ): ConversationCreatedEvent {
    const message = createBaseConversationCreatedEvent();
    message.conversation =
      object.conversation !== undefined && object.conversation !== null
        ? Conversation.fromPartial(object.conversation)
        : undefined;
    message.initiator = object.initiator ?? 0;
    return message;
  },
};

function createBaseConversationEditedEvent(): ConversationEditedEvent {
  return { conversation: undefined, initiator: 0, incomingActionType: '' };
}

export const ConversationEditedEvent = {
  encode(
    message: ConversationEditedEvent,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.conversation !== undefined) {
      Conversation.encode(
        message.conversation,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.initiator !== 0) {
      writer.uint32(16).sint64(message.initiator);
    }
    if (message.incomingActionType !== '') {
      writer.uint32(26).string(message.incomingActionType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ConversationEditedEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationEditedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conversation = Conversation.decode(reader, reader.uint32());
          break;
        case 2:
          message.initiator = longToNumber(reader.sint64() as Long);
          break;
        case 3:
          message.incomingActionType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConversationEditedEvent {
    return {
      conversation: isSet(object.conversation)
        ? Conversation.fromJSON(object.conversation)
        : undefined,
      initiator: isSet(object.initiator) ? Number(object.initiator) : 0,
      incomingActionType: isSet(object.incomingActionType)
        ? String(object.incomingActionType)
        : '',
    };
  },

  toJSON(message: ConversationEditedEvent): unknown {
    const obj: any = {};
    message.conversation !== undefined &&
      (obj.conversation = message.conversation
        ? Conversation.toJSON(message.conversation)
        : undefined);
    message.initiator !== undefined &&
      (obj.initiator = Math.round(message.initiator));
    message.incomingActionType !== undefined &&
      (obj.incomingActionType = message.incomingActionType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConversationEditedEvent>, I>>(
    object: I,
  ): ConversationEditedEvent {
    const message = createBaseConversationEditedEvent();
    message.conversation =
      object.conversation !== undefined && object.conversation !== null
        ? Conversation.fromPartial(object.conversation)
        : undefined;
    message.initiator = object.initiator ?? 0;
    message.incomingActionType = object.incomingActionType ?? '';
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
