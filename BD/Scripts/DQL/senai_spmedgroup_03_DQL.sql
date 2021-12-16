USE SP_MED_GROUP_CABRAL;
GO

SELECT * FROM especialidade;

SELECT * FROM tipoUsuario;

SELECT * FROM situacao; 

SELECT * FROM clinica;

SELECT * FROM usuario;

SELECT * FROM paciente;

SELECT * FROM medico;

SELECT * FROM consulta;

SELECT COUNT(idUsuario) FROM usuario;
GO

SELECT 
CONVERT (VARCHAR, dataNasc, 110)
FROM paciente;
GO

SELECT nomeMedico, nomeEspecialidade, nomePaciente, dataConsulta FROM consulta [C]
INNER JOIN paciente [P]
ON C.idPaciente = P.idPaciente
INNER JOIN medico [M]
ON C.idMedico = M.idMedico
INNER JOIN especialidade [E]
ON C.idConsulta = E.idEspecialidade;
GO