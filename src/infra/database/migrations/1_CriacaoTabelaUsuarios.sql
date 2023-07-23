IF NOT EXISTS ( SELECT O.name 
				FROM SysObjects O
				WHERE O.name = 'Usuarios'
				)
BEGIN
	CREATE TABLE Usuarios
		(
			CodigoUsuario INT NOT NULL CONSTRAINT PK_Usuarios_CodigoUsuario PRIMARY KEY IDENTITY,				
			Nome VARCHAR(100) NOT NULL,
			Login VARCHAR(30) NOT NULL,
			Senha VARCHAR(255) NOT NULL,
			CPF VARCHAR(12) NULL,
			Email VARCHAR(100) NOT NULL,
			PrimeiroAcesso CHAR(1) NOT NULL CONSTRAINT DF_Usuarios_PrimeiroAcesso DEFAULT 'S' CONSTRAINT CK_Usuarios_PrimeiroAcesso CHECK (PrimeiroAcesso = 'N' OR PrimeiroAcesso = 'S'),
			RefreshToken VARCHAR(250) NULL,
			InseridoEm DATETIME NOT NULL CONSTRAINT DF_Usuarios_InseridoEm DEFAULT GETDATE(),
			ModificadoEm DATETIME NULL,
		);
END
