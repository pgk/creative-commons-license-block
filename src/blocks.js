/* global wp */
import './common.scss';
import './block/block.js';

const { 
  data: { dispatch, select }, 
  blocks: { createBlock } 
} = wp;

dispatch( 'core/editor' ).insertBlock( createBlock( 'cgb/block-my-block', {} ) );
dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );
