// Parcel seems to need these
import React from 'react';
import ReactDOM from 'react-dom';

/* global wp */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

//  Import CSS.
import './style.scss';
import './editor.scss';

/**
 * Register our block with the editor
 * 
 * The first argument is the name of the block. It must be in form of namespace/block-name with 
 * only letters, numbers, and hyphens. This is how the editor knows which block controls to use
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
registerBlockType( 'automattic/glitch-block', {
    // This is the display title for your block, which can be translated with our translation 
    // functions. The block inserter will show this name.
    title: __( 'Glitch Block' ),

    // This is a short description for your block, which can be translated with our translation 
    // functions. This will be shown in the block inspector.
    description: __( 'This will be shown in the block inspector.' ),

    // Blocks are grouped into categories to help users browse and discover them.
    // The core provided categories are: common, formatting, layout, widgets, embed
    category: 'common',

    // An icon property should be specified to make it easier to identify a block. These can be any 
    // of WordPress’ Dashicons, or a custom svg element.
    // See https://developer.wordpress.org/resource/dashicons/
    icon: 'smiley',

    // Sometimes a block could have aliases that help users discover it while searching. 
    // For example, an image block could also want to be discovered by photo. You can do so by 
    // providing an array of terms (which can be translated).
    keywords: [ __( 'glitch' ) ],

    /**
     * The edit function describes the structure of your block in the context of the editor. This 
     * represents what the editor will render when the block is used.
     * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
     */
    edit: function ( { attributes, className, isSelected, setAttributes } ) {
        return (
            <div className={className}>
                <p>
                    Welcome to the Gutenberg block kit! This is a tool to build blocks for the Gutenberg 
                    block editor. To get started building your own block => 
                    <a href="https://glitch.com/~gutenberg-block-kit">visit the project page to 
                    read more</a> or go ahead and remix:
                </p>
                <p>
                    <a href="https://glitch.com/edit/#!/remix/gutenberg-block-kit" class="glitch-remix" target="_blank">remix button</a>
                </p>
                <img src="//placekitten.com/600/400" />
            </div>
        );
    },

    /**
     * The save function defines the way in which the different attributes should be combined into 
     * the final markup, which is then serialized by Gutenberg into post_content.
     * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
     */
    save: function ( { attributes } ) {
        return (
            <div>
                <p>This is from the block's <tt>save()</tt> method, and shows what the block will look like when rendered.</p>
                <img src="//lorempixel.com/600/300/city" />
            </div>
        );
    }
} );