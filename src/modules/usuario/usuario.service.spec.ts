import { loadConfig } from '@infra/config/load.config';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IUsuarioUsecase } from './interfaces/iusuario.usecase';
import { UsuarioModule } from './usuario.module';

describe('UsuarioService', () => {
  let service: IUsuarioUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [loadConfig],
          isGlobal: true,
        }),
        UsuarioModule,
      ],
      providers: [],
    }).compile();

    service = module.get(IUsuarioUsecase);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
