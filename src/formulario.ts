document.getElementById("nomeDigitado")?.focus()

// pegar os valores do form 

function validarFormulario(): boolean {

    const nome = document.getElementById("nomeDigitado") as HTMLInputElement

    const email = document.getElementById("emailDigitado") as HTMLInputElement

    const endereco = document.getElementById("enderecoDigitado") as HTMLInputElement


    if (nome.value.trim() === "") {
        alert("Preencha o nome")
        nome.focus()
        return false
    }

    if (email.value.trim() === "") {
        alert("Preencha o email")
        email.focus()
        return false
    }

    if (endereco.value.trim() === "") {
        alert("Preencha o endereço")
        endereco.focus()
        return false
    }

    return true
}


// type do cadastro

type Cadastro = {
    id: number
    nome: string
    email: string
    endereco: string
}


// type da resposta da API

type RespostaAPI = {
    sucesso: boolean
    cadastro?: Cadastro
    erro?: string
}

// função da tabela

function popularTabela(json: RespostaAPI): boolean {

   if (!json.sucesso || !json.cadastro) {
    alert(json.erro ?? "Nenhum registro encontrado")
    return false
}

    const colId = document.getElementById('col-id')

    const colNome = document.getElementById('col-nome')

    const colEmail = document.getElementById('col-email')

    const colEndereco = document.getElementById('col-endereco')

    const tabela = document.getElementById('tabelaResultado')

    // verificação de dados correspondentes.


    if (
        colId &&
        colNome &&
        colEmail &&
        colEndereco &&
        tabela
    ) {

        colId.textContent = String(json.cadastro.id)

        colNome.textContent = json.cadastro.nome

        colEmail.textContent = json.cadastro.email

        colEndereco.textContent = json.cadastro.endereco

        tabela.style.display = 'block'

        return true
    }

    return false
}

const formulario = document.getElementById('consultaForm') as HTMLFormElement

formulario.addEventListener('submit', async function(e: SubmitEvent) {

    e.preventDefault()

    const emailInput = document.getElementById('emailBusca') as HTMLInputElement

    const btn = document.getElementById('btnConsultar') as HTMLButtonElement

    const email:string = emailInput.value.trim()

// eu coloquei email :string , so pra visu msm. pq aparentemente qualquer elemento  transferido de HTML no TS ja vem automaticamente como string.
    btn.disabled = true

    btn.innerText = 'Consultando...'

try {

        const formData = new FormData()

        formData.append('email', email)


        const response = await fetch('../php/consulta.php',  {
            method: 'POST',
            body: formData
        })


        const json: RespostaAPI = await response.json()


        popularTabela(json)

    }

    catch (error) {

        console.error(error)

        alert('Erro na consulta')

    }

    finally {

        btn.disabled = false

        btn.textContent = 'Consultar'

    }

})


























