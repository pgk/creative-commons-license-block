/* global wp */
const { 
  data: { dispatch, select }, 
  blocks: { createBlock, getBlockTypes } 
} = wp;

// Load our custom blocks
import './common.scss';
import './block/block.js';


const glitchBlocks = getBlockTypes().filter( b => ! b.name );
console.log( glitchBlocks );

// Add our custom blocks to the editor, so they show on reload
const block = createBlock( 'cgb/block-my-block', {} );
dispatch( 'core/editor' ).insertBlock( block );
dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );

document.querySelector( '#preview' ).innerHTML = wp.blocks.getBlockContent( block );

