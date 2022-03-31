import SwaggerParser from '@apidevtools/swagger-parser';
import { SchemaObject, InfoObject, OperationObject, OpenAPIObject } from 'openapi3-ts';
import swagger2openapi from 'swagger2openapi';

declare type ResolverValue = {
    value: string;
    isEnum: boolean;
    type: string;
    imports: GeneratorImport[];
    schemas: GeneratorSchema[];
    originalSchema?: SchemaObject;
    isRef: boolean;
};
declare type ResReqTypesValue = ResolverValue & {
    formData?: string;
    formUrlEncoded?: string;
    isRef?: boolean;
    key: string;
    contentType: string;
};

declare type GetterResponse = {
    imports: GeneratorImport[];
    definition: {
        success: string;
        errors: string;
    };
    isBlob: boolean;
    types: {
        success: ResReqTypesValue[];
        errors: ResReqTypesValue[];
    };
    contentTypes: string[];
    schemas: GeneratorSchema[];
};
declare type GetterBody = {
    imports: GeneratorImport[];
    definition: string;
    implementation: string;
    schemas: GeneratorSchema[];
    formData?: string;
    formUrlEncoded?: string;
};
declare type GetterParam = {
    name: string;
    definition: string;
    implementation: string;
    default: boolean;
    required: boolean;
    imports: GeneratorImport[];
};
declare type GetterParams = GetterParam[];
declare type GetterQueryParam = {
    schema: GeneratorSchema;
    deps: GeneratorSchema[];
};
declare type GetterProp = {
    name: string;
    definition: string;
    implementation: string;
    default: boolean;
    required: boolean;
    type: 'param' | 'body' | 'queryParam';
};
declare type GetterProps = GetterProp[];

declare type GeneratorSchema = {
    name: string;
    model: string;
    imports: GeneratorImport[];
};
declare type GeneratorImport = {
    name: string;
    schemaName?: string;
    alias?: string;
    specKey?: string;
    default?: boolean;
    values?: boolean;
    syntheticDefaultImport?: boolean;
};
declare type GeneratorDependency = {
    exports: GeneratorImport[];
    dependency: string;
};
declare type GeneratorApiResponse = {
    operations: GeneratorOperations;
    schemas: GeneratorSchema[];
};
declare type GeneratorOperations = {
    [operationId: string]: GeneratorOperation;
};
declare type GeneratorTarget = {
    imports: GeneratorImport[];
    implementation: string;
    implementationMSW: string;
    importsMSW: GeneratorImport[];
    mutators?: GeneratorMutator[];
    formData?: GeneratorMutator[];
    formUrlEncoded?: GeneratorMutator[];
};
declare type GeneratorTargetFull = {
    imports: GeneratorImport[];
    implementation: string;
    implementationMSW: {
        function: string;
        handler: string;
    };
    importsMSW: GeneratorImport[];
    mutators?: GeneratorMutator[];
    formData?: GeneratorMutator[];
    formUrlEncoded?: GeneratorMutator[];
};
declare type GeneratorOperation = {
    imports: GeneratorImport[];
    implementation: string;
    implementationMSW: {
        function: string;
        handler: string;
    };
    importsMSW: GeneratorImport[];
    tags: string[];
    mutator?: GeneratorMutator;
    formData?: GeneratorMutator;
    formUrlEncoded?: GeneratorMutator;
    operationName: string;
};
declare type GeneratorVerbOptions = {
    verb: Verbs;
    summary?: string;
    doc: string;
    tags: string[];
    operationId: string;
    operationName: string;
    response: GetterResponse;
    body: GetterBody;
    queryParams?: GetterQueryParam;
    params: GetterParams;
    props: GetterProps;
    mutator?: GeneratorMutator;
    formData?: GeneratorMutator;
    formUrlEncoded?: GeneratorMutator;
    override: NormalizedOperationOptions;
};
declare type GeneratorVerbsOptions = GeneratorVerbOptions[];
declare type GeneratorOptions = {
    route: string;
    pathRoute: string;
    override: NormalizedOverrideOutput;
    context: ContextSpecs;
    mock: boolean;
};
declare type GeneratorClient = {
    implementation: string;
    imports: GeneratorImport[];
};
declare type GeneratorClientExtra = {
    implementation: string;
    implementationMSW: string;
};
declare type GeneratorMutatorParsingInfo = {
    numberOfParams: number;
};
declare type GeneratorMutator = {
    name: string;
    path: string;
    default: boolean;
    hasErrorType: boolean;
    errorTypeName: string;
    hasSecondArg: boolean;
    hasThirdArg: boolean;
    isHook: boolean;
    bodyTypeName?: string;
};
declare type ClientBuilder = (verbOptions: GeneratorVerbOptions, options: GeneratorOptions, outputClient: OutputClient | OutputClientFunc) => GeneratorClient;
declare type ClientHeaderBuilder = (params: {
    title: string;
    isRequestOptions: boolean;
    isMutator: boolean;
    noFunction?: boolean;
    isGlobalMutator: boolean;
    provideInRoot: boolean;
    provideIn: boolean | 'root' | 'any';
}) => string;
declare type ClientFooterBuilder = (params: {
    noFunction?: boolean | undefined;
    operationNames: string[];
    title?: string;
}) => string;
declare type ClientTitleBuilder = (title: string) => string;
declare type ClientDependenciesBuilder = (hasGlobalMutator: boolean) => GeneratorDependency[];
declare type ClientMSWBuilder = (verbOptions: GeneratorVerbOptions, generatorOptions: GeneratorOptions) => {
    imports: string[];
    implementation: string;
};
interface ClientGeneratorsBuilder {
    client: ClientBuilder;
    header: ClientHeaderBuilder;
    dependencies: ClientDependenciesBuilder;
    footer: ClientFooterBuilder;
    title: ClientTitleBuilder;
}
declare type GeneratorClients = Record<OutputClient, ClientGeneratorsBuilder>;

interface Options {
    output?: string | OutputOptions;
    input?: string | InputOptions;
}
declare type OptionsFn = () => Options | Promise<Options>;
declare type OptionsExport = Options | Promise<Options> | OptionsFn;
declare type Config = {
    [project: string]: OptionsExport;
};
declare type ConfigFn = () => Config | Promise<Config>;
declare type ConfigExternal = Config | Promise<Config> | ConfigFn;
declare type NormalizedOverrideOutput = {
    title?: (title: string) => string;
    transformer?: OutputTransformer;
    mutator?: NormalizedMutator;
    operations: {
        [key: string]: NormalizedOperationOptions;
    };
    tags: {
        [key: string]: NormalizedOperationOptions;
    };
    mock?: {
        properties?: MockProperties;
        format?: {
            [key: string]: unknown;
        };
        required?: boolean;
        baseUrl?: string;
    };
    header: false | ((info: InfoObject) => string[]);
    formData: boolean | NormalizedMutator;
    formUrlEncoded: boolean | NormalizedMutator;
    components: {
        schemas: {
            suffix: string;
        };
        responses: {
            suffix: string;
        };
        parameters: {
            suffix: string;
        };
        requestBodies: {
            suffix: string;
        };
    };
    query: QueryOptions;
    angular: Omit<Required<AngularOptions>, 'provideInRoot'>;
    operationName?: (operation: OperationObject, route: string, verb: Verbs) => string;
    requestOptions: Record<string, any> | boolean;
    useDates?: boolean;
};
declare type NormalizedMutator = {
    path: string;
    name?: string;
    default: boolean;
    alias?: Record<string, string>;
};
declare type NormalizedOperationOptions = {
    transformer?: OutputTransformer;
    mutator?: NormalizedMutator;
    mock?: {
        data?: MockProperties;
        properties?: MockProperties;
    };
    query?: QueryOptions;
    operationName?: (operation: OperationObject, route: string, verb: Verbs) => string;
    formData: boolean | NormalizedMutator;
    formUrlEncoded: boolean | NormalizedMutator;
    requestOptions: object | boolean;
};
declare type OutputClientFunc = (clients: GeneratorClients) => ClientGeneratorsBuilder;
declare type OutputOptions = {
    workspace?: string;
    target?: string;
    schemas?: string;
    mode?: OutputMode;
    mock?: boolean | ClientMSWBuilder;
    override?: OverrideOutput;
    client?: OutputClient | OutputClientFunc;
    clean?: boolean | string[];
    prettier?: boolean;
    tslint?: boolean;
    tsconfig?: string | Tsconfig;
};
declare type SwaggerParserOptions = Omit<SwaggerParser.Options, 'validate'> & {
    validate?: boolean;
};
declare type InputOptions = {
    target: string | OpenAPIObject;
    validation?: boolean;
    override?: OverrideInput;
    converterOptions?: swagger2openapi.Options;
    parserOptions?: SwaggerParserOptions;
};
declare type OutputClient = 'axios' | 'axios-functions' | 'angular' | 'react-query' | 'svelte-query' | 'vue-query' | 'swr';
declare const OutputClient: {
    ANGULAR: OutputClient;
    AXIOS: OutputClient;
    AXIOS_FUNCTIONS: OutputClient;
    REACT_QUERY: OutputClient;
    SVELTE_QUERY: OutputClient;
};
declare type OutputMode = 'single' | 'split' | 'tags' | 'tags-split';
declare const OutputMode: {
    SINGLE: OutputMode;
    SPLIT: OutputMode;
    TAGS: OutputMode;
    TAGS_SPLIT: OutputMode;
};
declare type MockProperties = {
    [key: string]: unknown;
} | ((specs: OpenAPIObject) => {
    [key: string]: unknown;
});
declare type OutputTransformerFn = (verb: GeneratorVerbOptions) => GeneratorVerbOptions;
declare type OutputTransformer = string | OutputTransformerFn;
declare type MutatorObject = {
    path: string;
    name?: string;
    default?: boolean;
    alias?: Record<string, string>;
};
declare type Mutator = string | MutatorObject;
declare type OverrideOutput = {
    title?: (title: string) => string;
    transformer?: OutputTransformer;
    mutator?: Mutator;
    operations?: {
        [key: string]: OperationOptions;
    };
    tags?: {
        [key: string]: OperationOptions;
    };
    mock?: {
        properties?: MockProperties;
        format?: {
            [key: string]: unknown;
        };
        required?: boolean;
        baseUrl?: string;
    };
    header?: boolean | ((info: InfoObject) => string[]);
    formData?: boolean | Mutator;
    formUrlEncoded?: boolean | Mutator;
    components?: {
        schemas?: {
            suffix?: string;
        };
        responses?: {
            suffix?: string;
        };
        parameters?: {
            suffix?: string;
        };
        requestBodies?: {
            suffix?: string;
        };
    };
    query?: QueryOptions;
    angular?: AngularOptions;
    operationName?: (operation: OperationObject, route: string, verb: Verbs) => string;
    requestOptions?: Record<string, any> | boolean;
    useDates?: boolean;
};
declare type QueryOptions = {
    useQuery?: boolean;
    useInfinite?: boolean;
    useInfiniteQueryParam?: string;
    options?: any;
};
declare type AngularOptions = {
    provideInRoot?: boolean;
    provideIn?: 'root' | 'any' | boolean;
};
declare type InputTransformerFn = (spec: OpenAPIObject) => OpenAPIObject;
declare type InputTransformer = string | InputTransformerFn;
declare type OverrideInput = {
    transformer?: InputTransformer;
};
declare type OperationOptions = {
    transformer?: OutputTransformer;
    mutator?: Mutator;
    mock?: {
        data?: MockProperties;
        properties?: MockProperties;
    };
    query?: QueryOptions;
    operationName?: (operation: OperationObject, route: string, verb: Verbs) => string;
    formData?: boolean | Mutator;
    formUrlEncoded?: boolean | Mutator;
    requestOptions?: object | boolean;
};
declare type Verbs = 'post' | 'put' | 'get' | 'patch' | 'delete' | 'head';
declare const Verbs: {
    POST: Verbs;
    PUT: Verbs;
    GET: Verbs;
    PATCH: Verbs;
    DELETE: Verbs;
    HEAD: Verbs;
};
interface ContextSpecs {
    specKey: string;
    target: string;
    workspace: string;
    tslint: boolean;
    specs: Record<string, OpenAPIObject>;
    override: NormalizedOverrideOutput;
    tsconfig?: Tsconfig;
}
interface GlobalOptions {
    projectName?: string;
    watch?: boolean | string | (string | boolean)[];
    clean?: boolean | string[];
    prettier?: boolean;
    tslint?: boolean;
    mock?: boolean;
    client?: OutputClient;
    mode?: OutputMode;
    tsconfig?: Tsconfig;
}
interface Tsconfig {
    baseUrl?: string;
    compilerOptions?: {
        esModuleInterop?: boolean;
        allowSyntheticDefaultImports?: boolean;
        paths?: Record<string, string[]>;
    };
}

/**
 * Type helper to make it easier to use orval.config.ts
 * accepts a direct {@link ConfigExternal} object.
 */
declare function defineConfig(options: ConfigExternal): ConfigExternal;

declare const generate: (optionsExport?: string | OptionsExport | undefined, workspace?: string, options?: GlobalOptions | undefined) => Promise<void>;

export { ClientBuilder, ClientDependenciesBuilder, ClientFooterBuilder, ClientGeneratorsBuilder, ClientHeaderBuilder, ClientMSWBuilder, ClientTitleBuilder, GeneratorApiResponse, GeneratorClient, GeneratorClientExtra, GeneratorClients, GeneratorDependency, GeneratorImport, GeneratorMutator, GeneratorMutatorParsingInfo, GeneratorOperation, GeneratorOperations, GeneratorOptions, GeneratorSchema, GeneratorTarget, GeneratorTargetFull, GeneratorVerbOptions, GeneratorVerbsOptions, Options, generate as default, defineConfig, generate };
