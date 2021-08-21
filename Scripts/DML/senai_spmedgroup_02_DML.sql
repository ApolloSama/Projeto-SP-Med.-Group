USE SP_MED_GROUP;
GO

INSERT INTO especialidade (nomeEspecialidade)
VALUES
('Acupuntura'),('Anestesiologia'),
('Angiologia'),('Cardiologia'),
('Cirurgia Cardiovascular'),('Cirurgia da Mão'),
('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),
('Cirurgia Pediátrica'),('Cirurgia Plástica'),
('Cirurgia Torácica'),('Cirurgia Vascular'),
('Dermatologia'),('Radioterapia'),
('Urologia'),('Pediatria'),
('Psiquiatria'),('Odontologia'),
('Gastrenterologia');
GO

INSERT INTO tipoUsuario (nomeTipoUsuario)
VALUES ('Administador'),('Médico'),('Paciente');
GO

INSERT INTO situacao (nomeSituacao) 
VALUES ('Realizada'),('Cancelada'),('Agendada');
GO

INSERT INTO clinica (nomeFantasia, razaoSocial, endereco, cnpj, horarioFunc)
VALUES ('Clínica Possarle','SP Med. Group','Av. Barão Limeira, 532, São Paulo, SP','86.400.902/0001-30','04:00');
GO

INSERT INTO usuario (idTipoUsuario, email, senha)
VALUES 
(2,'email1@gmail.com','senha1123'),(2,'email2@gmail.com','senha2123'),
(2,'email3@gmail.com','senha3123'),(3,'email4@gmail.com','senha4123'),
(3,'email5@gmail.com','senha5123'),(3,'email6@gmail.com','senha6123'),
(3,'email7@gmail.com','senha7123'),(3,'email8@gmail.com','senha8123'),
(3,'email9@gmail.com','senha9123'),(3,'email10@gmail.com','senha10123');
GO

INSERT INTO paciente (idUsuario,nomePaciente,dataNasc,telefone,rg,cpf,endereco)
VALUES
(4,'Ligia','10/13/1983','11 3456-7654','43522543-5','948.398.590-00','Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
(5,'Alexandre','7/23/2001','11 98765-6543','32654345-7','735.569.440-57','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
(6,'Fernando','10/10/1978','11 97208-4453','54636525-3','168.393.380-02','Av. Ibirapuera - Indianópolis, 2927, São Paulo - SP, 04029-200'),
(7,'Henrique','10/13/1985','11 3456-6543','54366362-5','143.326.547-65','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
(8,'João','8/27/1975','11 7656-6377','53254444-1','913.053.480-10','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
(9,'Bruno','3/21/1972','11 95436-8769','54566266-7','797.992.990-04','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
(10,'Mariana','03/05/2018','','54566266-8','137.719.130-39','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

INSERT INTO medico (idUsuario,idEspecialidade,idClinica,crm,nomeMedico)
VALUES
(2,2,1,'54356-SP','Ricardo Lemos'),
(2,17,1,'54356-SP','Roberto Possarle'),
(2,16,1,'54356-SP','Helena Strada');
GO

INSERT INTO consulta (idPaciente,idMedico,idSituacao,dataConsulta)
VALUES
(7,3,1,'20/01/2020 15:00:00'),(2,2,2,'06/01/2020 10:00:00'),
(3,2,1,'07/02/2020 11:00:00'),(2,2,1,'06/02/2018 10:00:00'),
(4,1,2,'07/02/2019 11:00:45'),(7,3,3,'08/03/2020 15:00:00'),
(4,1,3,'09/03/2020 11:00:45');
GO

