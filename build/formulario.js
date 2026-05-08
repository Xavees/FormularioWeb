document.getElementById("nomeDigitado")?.focus();
// pegar os valores do form 
function validarFormulario() {
    const nome = document.getElementById("nomeDigitado");
    const email = document.getElementById("emailDigitado");
    const endereco = document.getElementById("enderecoDigitado");
    if (nome.value.trim() === "") {
        alert("Preencha o nome");
        nome.focus();
        return false;
    }
    if (email.value.trim() === "") {
        alert("Preencha o email");
        email.focus();
        return false;
    }
    if (endereco.value.trim() === "") {
        alert("Preencha o endereço");
        endereco.focus();
        return false;
    }
    return true;
}
// função da tabela
function popularTabela(json) {
    if (!json.sucesso || !json.cadastro) {
        alert(json.erro ?? "Nenhum registro encontrado");
        return false;
    }
    const colId = document.getElementById('col-id');
    const colNome = document.getElementById('col-nome');
    const colEmail = document.getElementById('col-email');
    const colEndereco = document.getElementById('col-endereco');
    const tabela = document.getElementById('tabelaResultado');
    // verificação de dados correspondentes.
    if (colId &&
        colNome &&
        colEmail &&
        colEndereco &&
        tabela) {
        colId.textContent = String(json.cadastro.id);
        colNome.textContent = json.cadastro.nome;
        colEmail.textContent = json.cadastro.email;
        colEndereco.textContent = json.cadastro.endereco;
        tabela.style.display = 'block';
        return true;
    }
    return false;
}
const formulario = document.getElementById('consultaForm');
formulario.addEventListener('submit', async function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('emailBusca');
    const btn = document.getElementById('btnConsultar');
    const email = emailInput.value.trim();
    // eu coloquei email :string , so pra visu msm. pq aparentemente qualquer elemento  transferido de HTML no TS ja vem automaticamente como string.
    btn.disabled = true;
    btn.innerText = 'Consultando...';
    try {
        const formData = new FormData();
        formData.append('email', email);
        const response = await fetch('../php/consulta.php', {
            method: 'POST',
            body: formData
        });
        const json = await response.json();
        popularTabela(json);
    }
    catch (error) {
        console.error(error);
        alert('Erro na consulta');
    }
    finally {
        btn.disabled = false;
        btn.textContent = 'Consultar';
    }
});
export {};
