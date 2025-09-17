# 📝 Guia de Commits
Este documento estabelece o padrão para as mensagens de commit neste projeto. Seguir esta convenção garante um histórico de Git limpo, legível e que pode ser utilizado para gerar automaticamente logs de mudanças (changelogs), facilitar a depuração e melhorar a comunicação entre o time.

## 🚀 Estrutura da Mensagem
A mensagem de commit deve seguir a seguinte estrutura:
```
    <tipo>(<escopo>): <assunto>

    [corpo]

    [rodapé]
```
### 1 Tipo (`<tipo>`)
O tipo é obrigatório e descreve a natureza da mudança. Use letras minúsculas.


| Tipo | Descrição |
| ------------ | ----------------------------------- |
| `feat` | Uma nova funcionalidade. |
| `fix` | Uma correção de bug. |
| `docs`|Mudanças na documentação.|
|`style`|Alterações que não afetam o código (formatação, espaçamento, etc.).|
|`refactor`| Uma mudança de código que não adiciona funcionalidade nem corrige bug.|
|`test`| Adição ou correção de testes.|
|`chore`| Mudanças de rotina (atualização de dependências, scripts de build).|
|`perf`|Melhoria de desempenho.|
|`ci`|Alterações nos arquivos e scripts de CI/CD.|
|`config`|Configurações de sistema|

### 2. Escopo (`(<escopo>)`)
O escopo é **opcional** e fornece contexto sobre a mudança, indicando a área ou o componente afetado.

Exemplos: `(api)`, `(autenticacao)`, `(ui)`, `(componente-carrinho)`

### 3. Assunto (`<assunto>`)

O assunto é uma breve descrição da mudança.

- Deve ser conciso (até 50 caracteres).
- Use o modo imperativo. (Ex: "Adiciona `x`" em vez de "Adicionei `x`").
- Comece com letra minúscula.
- Não use pontuação no final.

## ✍️ Exemplos Práticos
**Adição de uma funcionalidade:**
```
feat(usuario): adiciona campo de email ao cadastro
```
**Correção de um bug:**
```
fix(login): corrige erro de redirecionamento apos login
```
**Mudança com quebra de compatibilidade:**
Se uma alteração quebra a compatibilidade com versões anteriores, adicione a mensagem `BREAKING CHANGE` no corpo do commit para detalhar a mudança.
```
feat(api): atualiza endpoint de usuarios para v2

BREAKING CHANGE: O endpoint /api/v1/usuarios foi descontinuado. Agora utilize /api/v2/usuarios.
```

### ✅ Como Usar
Siga este guia para criar mensagens de commit claras e eficientes, garantindo um histórico de projeto mais organizado e fácil de gerenciar.