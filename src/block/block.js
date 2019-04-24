import React from 'react';
import ReactDOM from 'react-dom';

//  Import CSS.
import './style.scss';
import './editor.scss';

/* global wp */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * The name for a block is a unique string that identifies a block. Names have to be structured as namespace/block-name, where namespace is the name of your plugin or theme.
 */
registerBlockType( 'automattic/glitch-block', {
	title: __( 'Glitch Block' ),

	description: __( 'This will be shown in the block inspector.' ),

  icon: 'smiley',

	category: 'common',

	keywords: [ __( 'glitch' ) ],

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

	edit: function( props ) {
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


	save: function() {
    return (
			<div>
				<p>This is from the block's <tt>save()</tt> method, and shows what the block will look like when rendered.</p>
        <img src="//lorempixel.com/600/300/city" />
			</div>
		);
  }
} );