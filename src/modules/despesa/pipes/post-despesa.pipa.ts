import { BaseValidationPipe } from "@common";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { DespesaModel } from "../model";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { handleBadRequest } from "@global";

@Injectable({ scope: Scope.REQUEST })
export class PostDespesaPipe extends BaseValidationPipe {
  constructor(@Inject(REQUEST) protected request: Request) {
    super(request);
  }

  async validate(data: DespesaModel) {
    const hoje = new Date();
    if (!data.descricao || data.descricao.length == 0) {
      handleBadRequest(null, "O campo descrição é obrigatório");
    } else if (data.descricao.length > 191) {
      handleBadRequest(
        null,
        "O campo descrição deve ter no máximo 191 caracteres"
      );
    } else if (!data.valor || data.valor <= 0) {
      handleBadRequest(
        null,
        "O campo valor é obrigatório e deve ser maior que zero."
      );
    }
    const dataDespesa = new Date(data.data);
    if (!dataDespesa.isDate() || dataDespesa.getTime() > hoje.getTime()) {
      handleBadRequest(
        null,
        "A data da despesa é obrigatória e não pode ser maior que a data atual."
      );
    }
  }

  override async transformData(data: DespesaModel) {
    return data;
  }
}
