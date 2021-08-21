CREATE DATABASE SP_MED_GROUP;
GO

USE SP_MED_GROUP;
GO

CREATE TABLE especialidade (
idEspecialidade TINYINT PRIMARY KEY IDENTITY (1,1),
nomeEspecialidade VARCHAR (100) NOT NULL
);
GO

CREATE TABLE tipoUsuario (
idTipoUsuario TINYINT PRIMARY KEY IDENTITY (1,1),
nomeTipoUsuario VARCHAR (20)
);
GO

CREATE TABLE situacao (
idSituacao TINYINT PRIMARY KEY IDENTITY (1,1),
nomeSituacao VARCHAR (10) NOT NULL
);
GO

CREATE TABLE clinica (
idClinica SMALLINT PRIMARY KEY IDENTITY (1,1),
nomeFantasia VARCHAR (80) UNIQUE NOT NULL,
razaoSocial VARCHAR (100) UNIQUE NOT NULL,
endereco VARCHAR (120) UNIQUE NOT NULL,
cnpj VARCHAR (20) UNIQUE NOT NULL
);
GO

ALTER TABLE clinica
ADD horarioFunc VARCHAR(5);
GO

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY (1,1),
idTipoUsuario TINYINT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
email VARCHAR (256) UNIQUE NOT NULL,
senha VARCHAR (256) CHECK (len(senha) >=8) NOT NULL,
);
GO

CREATE TABLE paciente (
idPaciente INT PRIMARY KEY IDENTITY (1,1),
idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
nomePaciente VARCHAR (120) NOT NULL,
dataNasc DATE NOT NULL,
telefone VARCHAR(18) DEFAULT 'CAMPO NÃO OBRIGATÓRIO', -- Considere as vovós --
rg CHAR(10) NOT NULL,
cpf CHAR(14) UNIQUE NOT NULL,
endereco VARCHAR (120) NOT NULL
);
GO

CREATE TABLE medico (
idMedico INT PRIMARY KEY IDENTITY (1,1),
idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
idEspecialidade TINYINT FOREIGN KEY REFERENCES especialidade(idEspecialidade),
idClinica SMALLINT FOREIGN KEY REFERENCES clinica(idClinica),
crm CHAR (8) NOT NULL,
nomeMedico VARCHAR (120) NOT NULL
);
GO

CREATE TABLE consulta (
idConsulta INT PRIMARY KEY IDENTITY (1,1),
idPaciente INT FOREIGN KEY REFERENCES paciente(idPaciente),
idMedico INT FOREIGN KEY REFERENCES medico (idMedico),
idSituacao TINYINT FOREIGN KEY REFERENCES situacao(idSituacao),
dataConsulta DATETIME NOT NULL,
);
GO