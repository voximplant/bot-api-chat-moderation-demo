.PHONY: gen-types
gen-types:
	protoc --proto_path=src/proto --proto_path=src/proto/api-grpc/src/main/proto --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=nestJs=true --ts_proto_opt=useOptionals=true --ts_proto_out=./src/types ./src/proto/api-grpc/src/main/proto/api.proto

gen-types-ts-only:
	protoc 	--proto_path=src/proto \
			--proto_path=src/proto/api-grpc/src/main/proto \
			--plugin=./node_modules/.bin/protoc-gen-ts_proto \
			--ts_proto_opt=useOptionals=true \
			--ts_proto_out=./src/types \
			--ts_proto_opt=returnObservable=true \
			./src/proto/api-grpc/src/main/proto/api.proto


# @deprecated
gen-types1:
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./types ./proto/api.protoset


.PHONY: gen-protoset
gen-protoset:
	protoc --proto_path=proto --proto_path=proto/api-grpc/src/main/proto --descriptor_set_out=proto/api.protoset --include_imports proto/api-grpc/src/main/proto/api.proto