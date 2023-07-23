const chaiHttp = require("chai-http");
const teste = require("chai");

describe("DespesasController", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSUQiOjIsInJlZnJlc2hUb2tlbiI6bnVsbCwiaWF0IjoxNjkwMDcyMzExLCJleHAiOjE2OTAyNDUxMTF9.l3ATT6eU5DlhEn49Z3oxgcktLLLKZ252yWlIhF0QZYU";
  const refreshToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSUQiOjIsInJlZnJlc2hUb2tlbiI6bnVsbCwiaWF0IjoxNjkwMDYzMzI3LCJleHAiOjE2OTA2NjgxMjd9.KAI_2_xV2oXbTbpEbbRpGYXiQEATDC22-KtjkpioBWY";
  let despesaId = 0;

  jest.setTimeout(15000);

  teste.use(chaiHttp);
  const request = teste.request;
  const baseUrl = "http://localhost:7016/v1";

  it("Cria uma despesa", (done) => {
    request(baseUrl)
      .post("/despesas")
      .set("x-api-key", token)
      .send({
        descricao: "Despesa 1",
        data: "2020-01-01",
        valor: 120.0,
      })
      .end((err, response) => {
        expect(response.body.id).toBeDefined();
        despesaId = response.body.id ? response.body.id : 0;
        done();
      });
  });

  it("Atualiza uma despesa", (done) => {
    request(baseUrl)
      .put("/despesas/"+despesaId)
      .set("x-api-key", token)
      .send({
        descricao: "Despesa 1 atualizada",
        data: "2020-01-01",
        valor: 120.0,
      })
      .end((err, response) => {
        expect(response.body.data.affected).toEqual(1);
        done();
      });
  });

  it("Recupera uma despesa", (done) => {
    request(baseUrl)
      .get("/despesas/"+despesaId)
      .set("x-api-key", token)
      .end((err, response) => {
        expect(response.body.usuario).toBeDefined();
        done();
      });
  });

  it("deleta uma despesa", (done) => {
    request(baseUrl)
      .delete("/despesas/"+despesaId)
      .set("x-api-key", token)
      .end((err, response) => {
        expect(response.body.data.affected).toEqual(1);
        done();
      });
  });

  it("Falha ao criar uma despesa (Valor negativo)", (done) => {
    request(baseUrl)
      .post("/despesas")
      .set("x-api-key", token)
      .send({
        descricao: "Despesa 2",
        data: "2020-01-01",
        valor: -120.0,
      })
      .end((err, response) => {
        expect(response.body.code).toEqual(400);
        done();
      });
  });

  it("Falha ao criar uma despesa (data futura)", (done) => {
    request(baseUrl)
      .post("/despesas")
      .set("x-api-key", token)
      .send({
        descricao: "Despesa 3",
        data: "2020-12-01",
        valor: 120.0,
      })
      .end((err, response) => {
        expect(response.body.code).toEqual(400);
        done();
      });
  });
});
