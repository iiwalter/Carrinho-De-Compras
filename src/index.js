const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];


function getShoppingCart(ids, productsList) {
	const listaDosProdutos = productsList.filter(produto => ids.includes(produto.id))

	const categoriasDosProdutos = []
	listaDosProdutos.forEach(produto => categoriasDosProdutos.push(produto.category));

	const produtos = []
	listaDosProdutos.forEach(produto => produtos.push({ name: produto.name, category: produto.category }));

	let contagemDeCategorias = categoriasDosProdutos.reduce((todasCategorias, categoria) => {
		if (categoria in todasCategorias) {
			todasCategorias[categoria]++;
		}
		else {
			todasCategorias[categoria] = 1;
		}
		return todasCategorias;
	}, {}); // retorna um objeto com o nome da categoria e a quantidade de vezes que ela se repete no array

	categoriasDosProdutos.length
	let quantidadeDeRepeticoes = Object.values(contagemDeCategorias)
	let ProdutosDaMesmaCategoria = quantidadeDeRepeticoes.reduce((a, b) => {
		return Math.max(a, b);
	}); // retorna a maior quantidade de repetições

	const quantosProdutosPossuem = categoriasDosProdutos.length
	let promocaoDoCarrinho = ''
	if (ProdutosDaMesmaCategoria >= 4 || quantosProdutosPossuem == 1) promocaoDoCarrinho = 'SINGLE LOOK'
	else if (ProdutosDaMesmaCategoria == 3 || quantosProdutosPossuem ==3) promocaoDoCarrinho = 'TRIPLE LOOK'
	else if (ProdutosDaMesmaCategoria == 2 || quantosProdutosPossuem == 2) promocaoDoCarrinho = 'DOUBLE LOOK'
	else if (ProdutosDaMesmaCategoria == 1 && quantosProdutosPossuem ==4) promocaoDoCarrinho = 'FULL LOOK'
 	
	/*
		*Busca a promoção de acordo com a quantidade de itens da mesma categoria;
		*Se houver promoção, adiciona o preço promocional do produto, 
		 se não houver promoção pro produto, ele irá adicionar o valor padrão do item.
	*/
	let total = 0;
	let valorPadrao = 0;
	let valorDesconto = 0
	function buscarValorPromocional(listaDosProdutos, promocaoDoCarrinho) {
		listaDosProdutos.forEach(produto => {
			const promocaoEncontrada = produto.promotions.find(promocao => {
				return promocao.looks.find(look => look == promocaoDoCarrinho)
			})
			promocaoEncontrada ? total += promocaoEncontrada.price : total += produto.regularPrice;
			valorPadrao += produto.regularPrice

		})

		return valorPadrao.toFixed(2), total.toFixed(2)
	}

	function valorDoDesconto(valorPadrao, valorCobrado) {
		valorDesconto = (valorPadrao - valorCobrado).toFixed(2)
		return valorDesconto
	} 

	function porcentagemDoDesconto(valorPadrao, valorDoDesconto) {
		const porcentagem = ((valorDoDesconto * 100) / valorPadrao).toFixed(2)
		return `${porcentagem}%`
	}


	return {
		products: produtos,
		promotion: promocaoDoCarrinho,
		totalPrice: buscarValorPromocional(listaDosProdutos, promocaoDoCarrinho),
		discountValue: valorDoDesconto(valorPadrao, total),
		discount: porcentagemDoDesconto(valorPadrao, valorDesconto)
	}

}



module.exports = { getShoppingCart };