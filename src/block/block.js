import React from 'react';
import ReactDOM from 'react-dom';

//  Import CSS.
import './style.scss';
import './editor.scss';

/* global wp */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register our block with the editor
 * 
 * The first argument is the name, which must be in form of namespace/block-name
 * with only letters, numbers, and hyphens.
 *
 * The second argument is the block settings object. You can read about all the
 * options available at 
 * https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
registerBlockType( 'automattic/glitch-block', {
  // This is the display title for your block, which can be translated with our translation functions. The block inserter will show this name.
	title: __( 'Glitch Block' ),

  // This is a short description for your block, which can be translated with our translation functions. This will be shown in the block inspector.
	description: __( 'This will be shown in the block inspector.' ),

  // Blocks are grouped into categories to help users browse and discover them.
  // The core provided categories are: common, formatting, layout, widgets, embed
  category: 'common',

  // An icon property should be specified to make it easier to identify a block. These can be any of WordPress’ Dashicons, or a custom svg element.
  icon: 'smiley',


	keywords: [ __( 'glitch' ) ],

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