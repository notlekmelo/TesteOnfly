import * as fs from 'fs';
import * as moment from 'moment';
import { Bancos, Boletos } from '@notlekmelo/gerar-boletos';
import { UnprocessableEntityException } from '@nestjs/common';

const BANCOS = {
  '001': Bancos.BancoBrasil,
  '033': Bancos.Santander,
  '104': Bancos.Caixa,
  '341': Bancos.Itau,
  '748': Bancos.Sicredi,
  '756': Bancos.Sicoob,
};

export interface Boleto {
  identificador: string;
  pagador: {
    nome: string;
    registroNacional: string;
    endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      estadoUF: string;
      cep: string;
    };
  };
  instrucoes: string[];
  beneficiario: {
    nome: string;
    cnpj: string;
    dadosBancarios: {
      carteira?: string;
      agencia: string;
      agenciaDigito: string;
      conta: string;
      contaDigito: string;
      nossoNumero: string;
      nossoNumeroDigito: string;
      codigo: string;
      digitoCodigoBeneficiario: string;
      convenio?: string;
    };
    endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      estadoUF: string;
      cep: string;
    };
  };
  boleto: {
    numeroDocumento: string;
    especieDocumento: string;
    localPagamento: string;
    valor: number;
    datas: {
      //MM-DD-YYYY
      vencimento: string;
      processamento: string;
      documentos: string;
    };
  };
}

export class BancoUtil {
  static async gerarBoleto(data: Boleto): Promise<Buffer> {
    const Banco = BANCOS[data.identificador];

    if (!Banco) {
      throw new UnprocessableEntityException('Banco não encontrado');
    }

    const banco = new Banco();
    const boleto = new Boletos({ ...data, banco });

    boleto.gerarBoleto();

    fs.existsSync('./temp') || fs.mkdirSync('./temp');
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const caminhoArquivo = `./temp/boleto_${data.identificador}_${timestamp}.pdf`;

    return new Promise((resolve, reject) => {
      boleto.pdfFile(caminhoArquivo).then(({ stream }) => {
        stream.on('finish', () => {
          fs.readFile(caminhoArquivo, (err: any, buffer) => {
            if (err) {
              throw new UnprocessableEntityException(err);
            } else {
              resolve(buffer);
            }

            fs.unlinkSync(caminhoArquivo);
          });
        });
        stream.on('error', () => reject);
      });
    });
  }

  static formatarData(data: Date) {
    return data ? moment.utc(data).format('YYYY-MM-DD HH:mm:ss.000') : '';
  }
}
