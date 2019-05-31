import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, Page, Stack, Button, Modal, Card, ResourceList } from '@shopify/polaris';

class ProductEdit extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { product, product_images, static_text } = this.props

		return (
			<AppProvider>
				<Page
					title={product.shopify_title}
					primaryAction={{content: static_text.save}}
				>
					<Card>
						<img src={product.shopify_image_url} alt={product.shopify_title} style={{maxWidth: '250px'}}/>

						{product_images.map((image) =>{
							return (
								<div>
									<img src={image.image_url} alt="" style={{maxWidth: '150px'}}/>
								</div>
							)
						})}
					</Card>
				</Page>
			</AppProvider>
		)
	}
}

export default ProductEdit;
document.addEventListener('DOMContentLoaded', () => {
	const node = document.getElementById('product-edit')
	const data = JSON.parse(node.getAttribute('data'))
	ReactDOM.render(<ProductEdit {...data} />, node)
})
