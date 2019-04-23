/* global wp */

// We are going to observe calls to wp.blocks.registerBlockType so that we
// know the names of the custom blocks that are being registered.
const _oldRegisterBlockType = wp.blocks.registerBlockType;
const glitchBlocks = new Set();

Object.defineProperty( wp.blocks, 'registerBlockType', ( name, settings ) => {
  console.log( name );
  glitchBlocks.add( name );
  return _oldRegisterBlockType( name, settings );
} );

// Load our custom blocks
import './common.scss';
import './block/block.js';

// Add our custom blocks to the editor, so they show on reload
const { 
  data: { dispatch, select }, 
  blocks: { createBlock } 
} = wp;

dispatch( 'core/editor' ).insertBlock( createBlock( 'cgb/block-my-block', {} ) );
dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );

// Restore the original, unobserved registerBlockType
Object.defineProperty( wp.blocks, 'registerBlockType', _oldRegisterBlockType );
