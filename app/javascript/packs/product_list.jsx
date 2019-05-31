import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { AppProvider, Page, Stack, TextStyle, Card, ResourceList } from '@shopify/polaris'



class ProductList extends Component {
	constructor(props) {
		super(props);
	}

	renderProduct = (product) => {
		const { id, shopify_title, shopify_image_url } = product
		return (
			<ResourceList.Item
				id={id}
				accessibilityLabel={`details for ${shopify_title}`}
			>
				<a href={Routes.edit_api_v1_stored_product_path({id: id})} >
				<Stack>
					<img src={shopify_image_url} style={{width: '100px'}} />
					<h3><TextStyle>{shopify_title}</TextStyle></h3>
				</Stack>
				</a>

			</ResourceList.Item>
		)
	}

	render() {
		const { products, static_text } = this.props
		return (
			<AppProvider
				i18n={{
					Polaris: {
						ResourceList: {
							showing: static_text.number_items_showing,
							defaultItemSingular: static_text.item,
							defaultItemPlural: static_text.items
						}
					}
				}}
			>
				<Page 
					title={static_text.title}
				>
					<Card>
						<ResourceList
							showHeader
							items={products}
							renderItem={this.renderProduct}
						>

						</ResourceList>
					</Card>

				</Page>
			</AppProvider>
		)
	}
}

export default ProductList;

document.addEventListener('DOMContentLoaded', () => {
	const node = document.getElementById('product-list')
	const data = JSON.parse(node.getAttribute('data'))
	ReactDOM.render(<ProductList {...data} />, node)
})


