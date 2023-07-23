import { Module } from '@nestjs/common';
import { IDespesaUsecase } from './interfaces/iDespesa.usecase'; 
import { DespesaController } from './despesa.controller'; 
import { DespesaService } from './despesa.service';
import { DespesaDataModule } from '@data/modules';

@Module({
  imports: [DespesaDataModule],
  providers: [
    DespesaService,
    {
      provide: IDespesaUsecase,
      useClass: DespesaService,
    },
  ],
  exports: [DespesaDataModule, DespesaService],
  controllers: [DespesaController],
})
export class DespesaModule {}
