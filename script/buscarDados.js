export function getDocenteDisciplinas(matricula) {
    /**Parametro: Matricula do docente
     * Retorna uma lista com o código das disciplinas, exemplo: ["IME04-12345", "IME04-12345"] */
    const docenteDiscip = localStorage.getItem('docenteDiscip')

    if (!docenteDiscip) {
        return fetch('../data/docentes-turmas.json')
        .then(response => response.json())
        .then(data => {
            const docentes = data.docentes.find(
                d => d.matricula === matricula
            )
            const disciplinas = docentes.turmas.map (turmas => turmas.disciplina);
            
            localStorage.setItem('docenteTurmas', JSON.stringify(turmas));
            return turmas;

        }).catch(error => {
            console.error('Erro ao carregar o arquivo', error);
        });
    }else {
        return Promise.resolve(JSON.parse(docenteDiscip));
    }
}

export function getDisciplina(codigoDisciplina) {
    /** Função para buscar disciplina:
     * Retorna um objeto da disciplina:   
        nome: nome da disciplina (ex: "Computação Gráfica")  
        turma: número identificador da turma (ex: 1)
        horario: lista com os dias e horários das aulas (ex: ["TER M1 M2", "QUI M1 M2"])
        link: URL para a ementa oficial da disciplina (ex: "https://www.ementario.uerj.br/ementa.php?cdg_disciplina=10842"
    */

    return fetch('../data/disciplinas.json')
    .then(response => response.json())
    .then(data => {
        const disciplina = data.disciplinas.find(
            d => d.codigo === codigoDisciplina
        )
        return disciplina;

    }).catch(error => {
        console.error('Erro ao carregar o arquivo', error);
    });
}

export function getAlunos(codigoDisciplina, numeroTurma) {
    return fetch('../data/OUTRO-turmas.json')
    .then(response => response.json())
    .then(data => {
        const turma = data.turmas.find(
            t => t.turmaID === `${codigoDisciplina} ${numeroTurma} 2025/1`
        )
        const alunos = turma.alunos
        return alunos;

    }).catch(error => {
        console.error('Erro ao carregar o arquivo', error);
    });
}