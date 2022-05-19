/* eslint-disable */
import { util, configure, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import {
  LoginResponse,
  CreateConversationResponse,
  GetConversationsResponse,
  GetParticipantsResponse,
  RetransmitEventsResponse,
  GetUserDataResponse,
  MessageReceivedEvent,
  MessageEditedEvent,
  MessageRemovedEvent,
  LoginRequest,
  CreateConversationRequest,
  EditConversationRequest,
  GetConversationsRequest,
  RemoveConversationsRequest,
  GetParticipantsRequest,
  AddParticipantsRequest,
  RemoveParticipantsRequest,
  ManagePermissionsRequest,
  RetransmitEventsRequest,
  GetUserDataRequest,
  EditUserDataRequest,
} from '../../../../structs';
import { Empty } from '../../../../google/protobuf/empty';
import {
  CreateBotResponse,
  BotEvent,
  SQBotEvent,
  RegisterWebHookResponse,
  CreateBotRequest,
  RemoveBotRequest,
  RegisterWebHookRequest,
  UnregisterWebHookRequest,
  SendMessageRequest,
  EditMessageRequest,
  RemoveMessageRequest,
  BotCommand,
  SQBotCommand,
} from '../../../../bot';
import { map } from 'rxjs/operators';

export const protobufPackage = 'com.voximplant.im';

/**
 * The methods for authorization management.
 *
 * All methods are executed on behalf of a main Voximplant developer account,
 * i.e., with all possible permissions.
 */
export interface AuthorizationService {
  /**
   * `Login` performs login with the specified credentials.
   * See the possible authorization options [in the HTTP API reference.](https://voximplant.com/docs/references/httpapi/auth_parameters).
   * Response contains a token required for using all other API methods.
   *
   * Note that a token expires in 30 seconds. Bot uses a separate token, see
   * the __BotManagementService__ method.
   */
  Login(request: LoginRequest): Promise<LoginResponse>;
}

export class AuthorizationServiceClientImpl implements AuthorizationService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Login = this.Login.bind(this);
  }
  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.AuthorizationService',
      'Login',
      data,
    );
    return promise.then((data) => LoginResponse.decode(new Reader(data)));
  }
}

/**
 * The methods for conversation management.
 *
 * All methods are executed on behalf of a main Voximplant developer account,
 * i.e., with all possible permissions.
 */
export interface ConversationService {
  /**
   * `CreateConversation` creates a new conversation with the extended configuration.
   *
   * Returns UUID for a new conversation.
   */
  CreateConversation(
    request: CreateConversationRequest,
  ): Promise<CreateConversationResponse>;
  /** `EditConversation` updates the specified conversation. */
  EditConversation(request: EditConversationRequest): Promise<Empty>;
  /**
   * `GetConversations` searches for the specified conversation(s). The search results are filtered according to the specified parameters only.
   *
   * If parameters are not specified, the method returns the last 20 conversations that were created in the account.
   */
  GetConversations(
    request: GetConversationsRequest,
    meta: any,
  ): Promise<GetConversationsResponse>;
  /**
   * `RemoveConversations` removes all the specified conversations.
   *
   * Note that all specified conversations should exist. The method returns an exception if:
   * * at least one of the specified conversations doesn't exist (or already deleted)
   * * no conversations are passed
   */
  RemoveConversations(request: RemoveConversationsRequest): Promise<Empty>;
  /** `GetParticipants` gets participants of the specified conversation. */
  GetParticipants(
    request: GetParticipantsRequest,
  ): Promise<GetParticipantsResponse>;
  /**
   * `AddParticipants` allows to add participants to the specified conversation.
   *
   * Duplicated users are ignored. The methods returns an exception if:
   * * at least one user doesn't exist or already belongs to the conversation
   * * conversation UUID is invalid (deleted or doesn't exist)
   */
  AddParticipants(request: AddParticipantsRequest): Promise<Empty>;
  /**
   * `RemoveParticipants` allows to remove participants from the specified conversation.
   *
   * Duplicated users are ignored. The methods returns an exception if:
   * * at least one user doesn't exist or already removed from the conversation
   * * conversation UUID is invalid (deleted or doesn't exist)
   */
  RemoveParticipants(request: RemoveParticipantsRequest): Promise<Empty>;
  /**
   * `ManagePermissions` allows to manage permissions for the specified participants. The `can_write`, `can_edit` and `can_remove` permissions are given by default to all users.
   *
   * See the available permissions in the [Participant] structure.
   */
  ManagePermissions(request: ManagePermissionsRequest): Promise<Empty>;
  RetransmitEvents(
    request: RetransmitEventsRequest,
  ): Promise<RetransmitEventsResponse>;
}

export class ConversationServiceClientImpl implements ConversationService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateConversation = this.CreateConversation.bind(this);
    this.EditConversation = this.EditConversation.bind(this);
    this.GetConversations = this.GetConversations.bind(this);
    this.RemoveConversations = this.RemoveConversations.bind(this);
    this.GetParticipants = this.GetParticipants.bind(this);
    this.AddParticipants = this.AddParticipants.bind(this);
    this.RemoveParticipants = this.RemoveParticipants.bind(this);
    this.ManagePermissions = this.ManagePermissions.bind(this);
    this.RetransmitEvents = this.RetransmitEvents.bind(this);
  }
  CreateConversation(
    request: CreateConversationRequest,
  ): Promise<CreateConversationResponse> {
    const data = CreateConversationRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'CreateConversation',
      data,
    );
    return promise.then((data) =>
      CreateConversationResponse.decode(new Reader(data)),
    );
  }

  EditConversation(request: EditConversationRequest): Promise<Empty> {
    const data = EditConversationRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'EditConversation',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  GetConversations(
    request: GetConversationsRequest,
  ): Promise<GetConversationsResponse> {
    const data = GetConversationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'GetConversations',
      data,
    );
    return promise.then((data) =>
      GetConversationsResponse.decode(new Reader(data)),
    );
  }

  RemoveConversations(request: RemoveConversationsRequest): Promise<Empty> {
    const data = RemoveConversationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'RemoveConversations',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  GetParticipants(
    request: GetParticipantsRequest,
  ): Promise<GetParticipantsResponse> {
    const data = GetParticipantsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'GetParticipants',
      data,
    );
    return promise.then((data) =>
      GetParticipantsResponse.decode(new Reader(data)),
    );
  }

  AddParticipants(request: AddParticipantsRequest): Promise<Empty> {
    const data = AddParticipantsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'AddParticipants',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  RemoveParticipants(request: RemoveParticipantsRequest): Promise<Empty> {
    const data = RemoveParticipantsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'RemoveParticipants',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  ManagePermissions(request: ManagePermissionsRequest): Promise<Empty> {
    const data = ManagePermissionsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'ManagePermissions',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  RetransmitEvents(
    request: RetransmitEventsRequest,
  ): Promise<RetransmitEventsResponse> {
    const data = RetransmitEventsRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.ConversationService',
      'RetransmitEvents',
      data,
    );
    return promise.then((data) =>
      RetransmitEventsResponse.decode(new Reader(data)),
    );
  }
}

/** The methods for user management. */
export interface UserDataService {
  /**
   * `GetUserData` allows to get information about the specified users.
   *
   * It's possible to get any users of the main Voximplant developer account or its child accounts. Each user can be specified either by ID or user name.
   *
   * The methods returns an exception if:
   * * at least one user doesn't exist
   * * at least one user belongs to another Voximplant developer account
   */
  GetUserData(request: GetUserDataRequest): Promise<GetUserDataResponse>;
  /**
   * `EditUserData` allows to edit the specified user.
   *
   * It's possible to edit only one user which belongs directly to the current Voximplant developer account.
   *
   * The methods returns an exception if:
   * * a user doesn't exist
   * * a user belongs to another Voximplant developer account
   */
  EditUserData(request: EditUserDataRequest): Promise<Empty>;
}

export class UserDataServiceClientImpl implements UserDataService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetUserData = this.GetUserData.bind(this);
    this.EditUserData = this.EditUserData.bind(this);
  }
  GetUserData(request: GetUserDataRequest): Promise<GetUserDataResponse> {
    const data = GetUserDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.UserDataService',
      'GetUserData',
      data,
    );
    return promise.then((data) => GetUserDataResponse.decode(new Reader(data)));
  }

  EditUserData(request: EditUserDataRequest): Promise<Empty> {
    const data = EditUserDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.UserDataService',
      'EditUserData',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }
}

/**
 * The methods for bot management.
 *
 * Bot is an entity for integrating with other platforms, sending service messages to conversations, etc.
 */
export interface BotManagementService {
  /**
   * `CreateBot` allows to create a new bot with the specified parameters.
   *
   * The method generates new credentials for a bot and returns an
   * exception if the specified bot name is the name of already existing bot.
   */
  CreateBot(request: CreateBotRequest): Promise<CreateBotResponse>;
  /**
   * `RemoveBot` deletes the bot by its ID.
   *
   * Only a bots creator and a main Voximplant developer account are able
   * to delete bots.
   */
  RemoveBot(request: RemoveBotRequest): Promise<Empty>;
}

export class BotManagementServiceClientImpl implements BotManagementService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateBot = this.CreateBot.bind(this);
    this.RemoveBot = this.RemoveBot.bind(this);
  }
  CreateBot(request: CreateBotRequest): Promise<CreateBotResponse> {
    const data = CreateBotRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotManagementService',
      'CreateBot',
      data,
    );
    return promise.then((data) => CreateBotResponse.decode(new Reader(data)));
  }

  RemoveBot(request: RemoveBotRequest): Promise<Empty> {
    const data = RemoveBotRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotManagementService',
      'RemoveBot',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }
}

/**
 * The methods for available bot actions.
 *
 * All methods are executed on behalf of an already existing bot.
 */
export interface BotService {
  /**
   * `Connect` opens a bidirectional stream via GRPC. Such a stream allows
   * bots to send commands and receive appropriate events.
   *
   * Available commands are SendMessage, EditMessage and RemoveMessage.
   *
   * Available events are:
   * * MessageReceived
   * * MessageEdited
   * * MessageDeleted
   * * ConversationEdited
   * * ErrorOccurred
   */
  Connect(request: Observable<BotCommand>): Observable<BotEvent>;
  /**
   * `ConnectWithSQ` opens a bidirectional stream via GRPC. Such a stream allows
   * bots to send commands and receive appropriate events.
   *
   * Available commands are EnqueueTask, EndTask, SendMessage, EditMessage and RemoveMessage.
   *
   * Available events are:
   * * MessageReceived
   * * MessageEdited
   * * MessageDeleted
   * * ConversationEdited
   * * ErrorOccurred
   * @hidden
   */
  ConnectWithSQ(
    request: Observable<SQBotCommand>,
    meta: any,
  ): Observable<SQBotEvent>;
  /**
   * The method registers a URL as a webhook in order to use regular
   * HTTP POST requests instead of a GRPS stream.
   *
   * The registered webhook is able to receive the following events that
   * are triggered by all conversation participants except the current bot:
   * * MessageReceived
   * * MessageEdited
   * * MessageDeleted
   * * ConversationEdited
   *
   * There could be only one registered webhook for a bot; attempting to
   * register a new webhook will replace the current one.
   * @hidden
   */
  RegisterWebHook(
    request: RegisterWebHookRequest,
  ): Promise<RegisterWebHookResponse>;
  /**
   * The method unregisters the specified webhook.
   *
   * The method returns an exception if the specified webhook doesn't
   * exist or already unregistered.
   * @hidden
   */
  UnregisterWebHook(request: UnregisterWebHookRequest): Promise<Empty>;
  /**
   * Send a message to the specified conversation.
   *
   * Sending messages is available only for participants
   * that have the `can_write` permission.
   * @hidden
   */
  SendMessage(request: SendMessageRequest): Promise<MessageReceivedEvent>;
  /**
   * Edit the specified message in the conversation.
   *
   * Editing messages is available only for participants
   * that have the `can_edit` and/or `can_edit_all` permissions.
   * @hidden
   */
  EditMessage(request: EditMessageRequest): Promise<MessageEditedEvent>;
  /**
   * Remove the specified message in the conversation.
   *
   * Removing messages is available only for participants
   * that have the `can_remove` and/or `an_remove_all` permissions.
   * @hidden
   */
  RemoveMessage(request: RemoveMessageRequest): Promise<MessageRemovedEvent>;
}

export class BotServiceClientImpl implements BotService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Connect = this.Connect.bind(this);
    this.ConnectWithSQ = this.ConnectWithSQ.bind(this);
    this.RegisterWebHook = this.RegisterWebHook.bind(this);
    this.UnregisterWebHook = this.UnregisterWebHook.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.EditMessage = this.EditMessage.bind(this);
    this.RemoveMessage = this.RemoveMessage.bind(this);
  }
  Connect(request: Observable<BotCommand>): Observable<BotEvent> {
    const data = request.pipe(
      map((request) => BotCommand.encode(request).finish()),
    );
    const result = this.rpc.bidirectionalStreamingRequest(
      'com.voximplant.im.BotService',
      'Connect',
      data,
    );
    return result.pipe(map((data) => BotEvent.decode(new Reader(data))));
  }

  ConnectWithSQ(request: Observable<SQBotCommand>): Observable<SQBotEvent> {
    const data = request.pipe(
      map((request) => SQBotCommand.encode(request).finish()),
    );
    const result = this.rpc.bidirectionalStreamingRequest(
      'com.voximplant.im.BotService',
      'ConnectWithSQ',
      data,
    );
    return result.pipe(map((data) => SQBotEvent.decode(new Reader(data))));
  }

  RegisterWebHook(
    request: RegisterWebHookRequest,
  ): Promise<RegisterWebHookResponse> {
    const data = RegisterWebHookRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotService',
      'RegisterWebHook',
      data,
    );
    return promise.then((data) =>
      RegisterWebHookResponse.decode(new Reader(data)),
    );
  }

  UnregisterWebHook(request: UnregisterWebHookRequest): Promise<Empty> {
    const data = UnregisterWebHookRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotService',
      'UnregisterWebHook',
      data,
    );
    return promise.then((data) => Empty.decode(new Reader(data)));
  }

  SendMessage(request: SendMessageRequest): Promise<MessageReceivedEvent> {
    const data = SendMessageRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotService',
      'SendMessage',
      data,
    );
    return promise.then((data) =>
      MessageReceivedEvent.decode(new Reader(data)),
    );
  }

  EditMessage(request: EditMessageRequest): Promise<MessageEditedEvent> {
    const data = EditMessageRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotService',
      'EditMessage',
      data,
    );
    return promise.then((data) => MessageEditedEvent.decode(new Reader(data)));
  }

  RemoveMessage(request: RemoveMessageRequest): Promise<MessageRemovedEvent> {
    const data = RemoveMessageRequest.encode(request).finish();
    const promise = this.rpc.request(
      'com.voximplant.im.BotService',
      'RemoveMessage',
      data,
    );
    return promise.then((data) => MessageRemovedEvent.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
  clientStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>,
  ): Promise<Uint8Array>;
  serverStreamingRequest(
    service: string,
    method: string,
    data: Uint8Array,
  ): Observable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>,
  ): Observable<Uint8Array>;
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
