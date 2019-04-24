/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import React from 'react';
import ReactDOM from 'react-dom';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = window.wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = window.wp.blocks; // Import registerBlockType() from wp.blocks
const { ExternalLink, Path } from '@wordpress/components';

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'tinker/glitch-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'My Glitch Block' ), // Block title.
	icon: 'smiley', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Glitch' ),
		__( 'Block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-my-block'></p>.
		return (
			<div className={ props.className }>
				<p>
					Welcome to Glitchenberg! This is a tool to build blocks for the Gutenberg 
          block editor. To get started building your own 
          block => <a href="https://glitch.com/~gutenberg-block-kit">visit 
          the project page to read more</a> or go ahead and remix:
        </p>
        <p>
          <a href="https://glitch.com/edit/#!/remix/gutenberg-block-kit" class="glitch-remix" target="_blank">remix button</a>
				</p>
        <img src="//placekitten.com/600/400" />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<p>This is from the block's <tt>save()</tt> method, and shows what the block will look like when rendered.</p>
        <img src="//lorempixel.com/600/300/city" />
			</div>
		);
	},
} );

/**
 * External dependencies
 */
import { __{{#hasKeywords}}, _x{{/hasKeywords}} } from '@wordpress/i18n';
import { ExternalLink, Path } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import renderMaterialIcon from '../../shared/render-material-icon';
import edit from './edit';

/**
 * Style dependencies
 */
import './editor.scss';

export const name = '{{ slug }}';
export const title = __( '{{ title }}', 'jetpack' );
export const settings = {
	title,

	description: (
		<Fragment>
			<p>{ __( '{{ description }}', 'jetpack' ) }</p>
			<ExternalLink href="#">{ __( 'Learn more about {{ title }}', 'jetpack' ) }</ExternalLink>
		</Fragment>
	),

	/* @TODO Add the icon. You can use one of these https://material.io/tools/icons/?style=outline */
	icon: renderMaterialIcon(
		<Path d="M9 15h2V9H9v6zm1-10c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm0-4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
	),

	category: 'jetpack',

	keywords: [{{#keywords}}_x( '{{ keyword }}', 'block search term', 'jetpack' ), {{/keywords}}],

	supports: {
		// Support for block's alignment (left, center, right, wide, full). When true, it adds block controls to change block’s alignment.
		align: false, /* if set to true, the 'align' option below can be used*/
		// Pick which alignment options to display.
		/*align: [ 'left', 'right', 'full' ],*/
		// Support for wide alignment, that requires additional support in themes.
		alignWide: true,
		// When true, a new field in the block sidebar allows to define an id for the block and a button to copy the direct link.
		anchor: false,
		// When true, a new field in the block sidebar allows to define a custom className for the block’s wrapper.
		customClassName: true,
		// When false, Gutenberg won't add a class like .wp-block-your-block-name to the root element of your saved markup
		className: true,
		// Setting this to false suppress the ability to edit a block’s markup individually. We often set this to false in Jetpack blocks.
		html: false,
		// Passing false hides this block in Gutenberg's visual inserter.
		/*inserter: true,*/
		// When false, user will only be able to insert the block once per post.
		multiple: true,
		// When false, the block won't be available to be converted into a reusable block.
		reusable: true,
	},

	edit,

	/* @TODO Write the block editor output */
	save: () => null,
};