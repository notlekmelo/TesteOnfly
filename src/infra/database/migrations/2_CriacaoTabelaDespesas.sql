IF NOT EXISTS ( SELECT O.name 
				FROM SysObjects O
				WHERE O.name = 'Despesas'
				)
BEGIN
	CREATE TABLE Despesas
		(
			CodigoDespesa INT NOT NULL CONSTRAINT PK_Despesas_CodigoDespesa PRIMARY KEY IDENTITY,				
			Descricao VARCHAR(191) NOT NULL,
			Valor MONEY NOT NULL,
			Data DATETIME NOT NULL,
			CodigoUsuario INT NOT NULL CONSTRAINT FK_Despesas_Usuarios_CodigoUsuario FOREIGN KEY (CodigoUsuario) REFERENCES Usuarios(CodigoUsuario),
			InseridoEm DATETIME NOT NULL CONSTRAINT DF_Despesas_InseridoEm DEFAULT GETDATE(),
			ModificadoEm DATETIME NULL,
		);
END