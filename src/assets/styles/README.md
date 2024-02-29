# Guia de Customização do Tema

Bem-vindo ao guia de customização do tema do projeto. Aqui estão as principais variáveis do layout, presentes no arquivo `_theme.less` na pasta `style`.

## Cores do Tema

As variáveis de cor definem a aparência geral do tema. Personalize-as para ajustar a paleta de cores do seu projeto.

```less
// Cores do Tema
@theme__color__primary: @color-blue-light;         // Cor primária
@theme__color__secondary: @color-blue-dark;         // Cor secundária
@theme__color__black: @color-black;                 // Cor preta
@theme__color__primary-alt: @color-white;           // Cor alternativa da cor primária
@primary__color__lighter: @color-gray-light;        // Tom mais claro da cor primária
```

## Layout

### Sidebar

Personalize as variáveis relacionadas à barra lateral.

```less
// Layout - Sidebar
@sidebar-with: 260px;                  // Largura da barra lateral
@sidebar-background: @theme__color__primary;  // Cor de fundo da barra lateral
```

Sinta-se à vontade para experimentar com essas variáveis para criar o visual desejado para o seu projeto. Lembre-se de compilar os arquivos Less após fazer alterações para visualizar as mudanças no seu aplicativo.

## Compilação dos Arquivos Less

Certifique-se de recompilar os arquivos Less após fazer alterações nas variáveis. Use a ferramenta apropriada ou o processo definido no seu projeto para compilar e atualizar o estilo.

Se tiver alguma dúvida ou precisar de mais assistência, consulte a documentação do seu ambiente de desenvolvimento ou entre em contato com a equipe de desenvolvimento do projeto.

Obrigado por escolher nosso tema!