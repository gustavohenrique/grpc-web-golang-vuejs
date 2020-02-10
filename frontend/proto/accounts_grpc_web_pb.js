/**
 * @fileoverview gRPC-Web generated client stub for private
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.private = require('./accounts_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.private.AccountServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.private.AccountServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.private.User,
 *   !proto.private.User>}
 */
const methodDescriptor_AccountService_Create = new grpc.web.MethodDescriptor(
  '/private.AccountService/Create',
  grpc.web.MethodType.UNARY,
  proto.private.User,
  proto.private.User,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.private.User,
 *   !proto.private.User>}
 */
const methodInfo_AccountService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.private.User,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.User.deserializeBinary
);


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.private.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.private.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.private.AccountServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/private.AccountService/Create',
      request,
      metadata || {},
      methodDescriptor_AccountService_Create,
      callback);
};


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.private.User>}
 *     A native promise that resolves to the response
 */
proto.private.AccountServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/private.AccountService/Create',
      request,
      metadata || {},
      methodDescriptor_AccountService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.private.User,
 *   !proto.private.Nothing>}
 */
const methodDescriptor_AccountService_ChangePassword = new grpc.web.MethodDescriptor(
  '/private.AccountService/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.private.User,
  proto.private.Nothing,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.Nothing.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.private.User,
 *   !proto.private.Nothing>}
 */
const methodInfo_AccountService_ChangePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.private.Nothing,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.Nothing.deserializeBinary
);


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.private.Nothing)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.private.Nothing>|undefined}
 *     The XHR Node Readable Stream
 */
proto.private.AccountServiceClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/private.AccountService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_AccountService_ChangePassword,
      callback);
};


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.private.Nothing>}
 *     A native promise that resolves to the response
 */
proto.private.AccountServicePromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/private.AccountService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_AccountService_ChangePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.private.User,
 *   !proto.private.Account>}
 */
const methodDescriptor_AccountService_AuthenticateByEmailAndPassword = new grpc.web.MethodDescriptor(
  '/private.AccountService/AuthenticateByEmailAndPassword',
  grpc.web.MethodType.UNARY,
  proto.private.User,
  proto.private.Account,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.Account.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.private.User,
 *   !proto.private.Account>}
 */
const methodInfo_AccountService_AuthenticateByEmailAndPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.private.Account,
  /**
   * @param {!proto.private.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.private.Account.deserializeBinary
);


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.private.Account)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.private.Account>|undefined}
 *     The XHR Node Readable Stream
 */
proto.private.AccountServiceClient.prototype.authenticateByEmailAndPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/private.AccountService/AuthenticateByEmailAndPassword',
      request,
      metadata || {},
      methodDescriptor_AccountService_AuthenticateByEmailAndPassword,
      callback);
};


/**
 * @param {!proto.private.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.private.Account>}
 *     A native promise that resolves to the response
 */
proto.private.AccountServicePromiseClient.prototype.authenticateByEmailAndPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/private.AccountService/AuthenticateByEmailAndPassword',
      request,
      metadata || {},
      methodDescriptor_AccountService_AuthenticateByEmailAndPassword);
};


module.exports = proto.private;

