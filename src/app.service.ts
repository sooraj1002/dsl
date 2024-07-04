import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  Schema,
  applyMigrations,
  createMigrations,
  generatePrismaSchemaFile,
} from '@techsavvyash/dynamo-prisma';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  async getHello() {
    let data = {
      schema: [
        {
          schemaName: 'cooooooooooolz',
          fields: [
            {
              fieldName: 'id',
              type: 'String',
              description: '',
              maxLength: '',
              isNullable: false,
              isUnique: true,
              isVectorEmbed: false,
            },
            {
              fieldName: 'question',
              type: 'String',
              description: '',
              maxLength: '',
              isNullable: false,
              isUnique: false,
              isVectorEmbed: true,
              embeddingAlgo: 'text-embedding-ada-002',
            },
            {
              fieldName: 'answer',
              type: 'String',
              description: '',
              maxLength: '',
              isNullable: false,
              isUnique: false,
              isVectorEmbed: true,
              embeddingAlgo: 'text-embedding-ada-002',
            },
          ],
          description: 'schema for questions and answers',
        },
        {
          schemaName: 'questions01',
          fields: [
            {
              fieldName: 'question',
              type: 'String',
              description: '',
              maxLength: 10,
              isNullable: false,
              isUnique: true,
              isVectorEmbed: false,
              isUuid: false,
              embeddingAlgo: 'text-embedding-ada-002',
            },
            {
              fieldName: 'question007',
              type: 'String',
              description: '',
              maxLength: 10,
              isNullable: true,
              isUnique: true,
              isVectorEmbed: false,
              isUuid: false,
              embeddingAlgo: 'text-embedding-ada-002',
            },
            {
              fieldName: 'answer',
              type: 'String',
              description: '',
              maxLength: '',
              isNullable: false,
              isId: true,
              isUuid: false,
              isAutoIncrement: false,
              isUnique: false,
              isVectorEmbed: false,
              // embeddingAlgo: 'text-embedding-ada-002',
            },
          ],
          description: 'schema for questions and answers',
        },
      ],
    };

    try {
      let schema = await generatePrismaSchemaFile(
        data as any as Schema,
        'prisma/schema.prisma',
      );
      await createMigrations(schema);
      await applyMigrations();
      this.logger.log('this is the generated schema from prisma dsl');
      this.logger.log(schema);
    } catch (e) {
      this.logger.error('found an error');
      this.logger.error(e);
      throw new ConflictException(`Error creating schema ${e}`);
    }
  }
}
