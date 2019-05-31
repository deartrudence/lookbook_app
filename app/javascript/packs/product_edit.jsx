import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, Page, Stack, Button, Modal, Card, ResourceList } from '@shopify/polaris';
import Block1 from '../block1.jsx'
import Block2 from '../block2.jsx'
import Block3 from '../block3.jsx'

class ProductEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blocks: [],
			resourcePickerOpen: false,
			currentBlockType: 'Block1',
			save_loading: false,
			save_disabled: true 
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.addBlock = this.addBlock.bind(this)
		this.deleteLastBlock = this.deleteLastBlock.bind(this)
		this.saveLookbook = this.saveLookbook.bind(this)
	}

	openModal(type){
		this.setState({currentBlockType: type})
		this.setState({resourcePickerOpen: true})
	}

	closeModal(){
		this.setState({resourcePickerOpen: false})
	}

	addBlock(image_url){
		this.setState({save_disabled: false})
		this.setState({ blocks: [...this.state.blocks, {block_id: Math.round(Math.random() *1000), block_text: 'new block', block_type: this.state.currentBlockType, image_url: image_url}]})
		this.closeModal()
	}

	deleteLastBlock(){
		this.setState({save_disabled: false})
		let blocks = this.state.blocks.pop()
		this.setState(blocks)
	}

	saveLookbook(){
		this.setState({save_loading: true})

		const lookbook_html = document.getElementById('allBlocks').innerHTML

		let stored_product = this.props.product
		stored_product.lookbook_html = lookbook_html

		this.setState({ stored_product }, () => {
			const data = {
				blocks: this.state.blocks,
				stored_product: this.state.stored_product
			}

			fetch(Routes.api_v1_stored_product_path(this.props.product.id, { format: 'json' }), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': Rails.csrfToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(resp => {
					this.setState({save_loading: false, save_disabled: true})
				})
		})
	}

	renderProductImage = (image) => {
		const { id, image_url } = image

		return (

			<ResourceList.Item
				id={id}
			>
				<a onClick={() => {this.addBlock(image_url)}}>
					<Stack>
						<img src={image_url} alt="" style={{width: '100px'}}/>
					</Stack>
				</a>

			</ResourceList.Item>
		)
	}

	componentDidMount() {
		this.setState({stored_product: this.props.product})
		this.setState({blocks: this.props.blocks})
	}


	render() {
		const { product, product_images, static_text } = this.props

		const { resourcePickerOpen, save_loading, save_disabled} = this.state

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
					breadcrumbs={[{content: static_text.product_title, url: Routes.root_path()}]}
					title={product.shopify_title}
					primaryAction={{
						content: static_text.save,
						loading: save_loading,
						disabled: save_disabled,
						onAction: () => { this.saveLookbook() }
					}}
				>
					<Card
						title={static_text.choose_block}
						sectioned
					>
						<Stack
							distribution="fill"
						>
							<Button size="medium" onClick={() => {this.openModal('Block3')}}>{static_text.block3_title}</Button>
							<Button size="medium" onClick={() => {this.openModal('Block1')}}>{static_text.block1_title}</Button>
							<Button size="medium" onClick={() => {this.openModal('Block2')}}>{static_text.block2_title}</Button>
							<Button
								destructive size="medium" onClick={() => {this.deleteLastBlock()}} 
							>
								{static_text.delete_block_title}
							</Button>
						</Stack>
					
					</Card>

					<Modal
						open={resourcePickerOpen}
						onClose={this.closeModal}
						title={static_text.choose_image}
						primaryAction={{
							content: static_text.close
						}}
					>
						<Modal.Section>
							<ResourceList
								showHeader
								items={product_images}
								renderItem={this.renderProductImage}
							>

							</ResourceList>

						</Modal.Section>

					</Modal>

					<Card>
						<div id="allBlocks">
							{this.state.blocks.map((block) =>{
								switch (block.block_type){

									case 'Block1':
										return <Block1 image_url={block.image_url} text={block.block_text} />
									case 'Block2':
										return <Block2 image_url={block.image_url} text={block.block_text} />
									case 'Block3':
										return <Block3 image_url={block.image_url} text={block.block_text} />
								}
							})}
						</div>
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
