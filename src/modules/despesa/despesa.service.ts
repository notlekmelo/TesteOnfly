import { QueryDto } from "@common";
import { DespesaRepository } from "@data";
import { handleNotFound } from "@global";
import { JwtPayload } from "@modules/auth/dto";
import { Injectable } from "@nestjs/common";
import { DespesaDto } from "./dto";
import { IDespesaUsecase } from "./interfaces/idespesa.usecase";
import { DespesaModel } from "./model";
import { EnviarEmail, emailPadrao } from "@infra/email/email";
import { CurrencyUtil, DateUtil } from "@shared";

@Injectable()
export class DespesaService implements IDespesaUsecase {
  constructor(private despesaRepository: DespesaRepository) {}

  async get(params: QueryDto, payload: JwtPayload) {
    const despesas = await this.despesaRepository.findWithPagination(
      { usuarioId: payload.usuarioID },
      { offset: params.offset, page: params.page - 1, limit: params.limit },
      params.search
    );

    return despesas;
  }

  async getID(despesaID: number, payload: JwtPayload): Promise<DespesaDto> {
    const despesa = await this.despesaRepository.findOne({
      where: {
        id: despesaID,
        usuarioId: payload.usuarioID,
      },
      relations: ["usuario"],
    });
    if (despesa) {
      const result: DespesaDto = {
        id: despesa.id,
        data: despesa.data,
        valor: despesa.valor,
        descricao: despesa.descricao,
        inseridoEm: despesa.createdAt,
        modificadoEm: despesa.updatedAt,
        usuarioId: despesa.usuarioId,
        usuario: despesa.usuario.nome,
      };
      return result;
    } else {
      handleNotFound(
        null,
        "A despesa não foi encontrado para o usuário especificado"
      );
    }
  }

  async post(body: DespesaModel, payload: JwtPayload) {
    const hoje = new Date();
    const despesaCadastrada = await this.despesaRepository.save({
      descricao: body.descricao,
      valor: body.valor,
      data: body.data,
      usuarioId: payload.usuarioID,
      createdAt: hoje,
    });
    const dataDespesa: any = despesaCadastrada.data

    EnviarEmail({from: emailPadrao,
      to: payload.email,
      subject: 'Despesa Cadastrada',
      html: `<!DOCTYPE html>
            <html lang="pt">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body>
                <h1> Despesa ${despesaCadastrada.id} cadastrada com sucesso. </h1>
                <h2> Dados da despesa: </h2>
                <p> Descrição: ${despesaCadastrada.descricao} </p>
                <p> Data: ${DateUtil.stringToDateString(dataDespesa)} </p>
                <p> Valor: ${CurrencyUtil.toBRL(despesaCadastrada.valor)} </p>
              </body> `
    },)

    return despesaCadastrada
  }

  async put(despesaID: number, body: DespesaModel, payload: JwtPayload) {
    const hoje = new Date();
    const despesa = await this.despesaRepository.findOne({
      where: {
        id: despesaID,
        usuarioId: payload.usuarioID,
      },
    });
    if (!despesa) {
      handleNotFound(
        null,
        "A despesa não foi encontrado para o usuário especificado"
      );
    }

    return await this.despesaRepository.update(despesaID, {
      descricao: body.descricao,
      data: new Date(body.data),
      valor: body.valor,
      updatedAt: hoje,
    });
  }

  async delete(despesaID: number, payload: JwtPayload) {
    const despesa = await this.despesaRepository.findOne({
      where: {
        id: despesaID,
        usuarioId: payload.usuarioID,
      },
    });
    if (!despesa) {
      handleNotFound(
        null,
        "A despesa não foi encontrado para o usuário especificado"
      );
    }
    return await this.despesaRepository.deleteById(despesaID);
  }
}
