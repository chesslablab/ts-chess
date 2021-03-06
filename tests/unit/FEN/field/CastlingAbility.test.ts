import { expect } from 'chai';
import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import CastlingAbility from '../../../../src/FEN/field/CastlingAbility';
import Piece from '../../../../src/PGN/AN/Piece';

describe('castlingAbility.validate()', () => {
  const castlingAbility = new CastlingAbility();
  it ('foobar throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('foobar')).to.throw(UnknownNotationError);
  });
  it ('kqKQ throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('kqKQ')).to.throw(UnknownNotationError);
  });
  it ('KkQq throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('KkQq')).to.throw(UnknownNotationError);
  });
  it ('-- throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('--')).to.throw(UnknownNotationError);
  });
  it ('k- throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('k-')).to.throw(UnknownNotationError);
  });
  it ('empty string throws UnknownNotationError', () => {
    expect(() => castlingAbility.validate('')).to.throw(UnknownNotationError);
  });
  it ('KQkq is valid', () => {
    expect(castlingAbility.validate('KQkq')).to.equal('KQkq');
  });
  it ('K is valid', () => {
    expect(castlingAbility.validate('K')).to.equal('K');
  });
  it ('Q is valid', () => {
    expect(castlingAbility.validate('Q')).to.equal('Q');
  });
  it ('k is valid', () => {
    expect(castlingAbility.validate('k')).to.equal('k');
  });
  it ('q is valid', () => {
    expect(castlingAbility.validate('q')).to.equal('q');
  });
  it ('KQ is valid', () => {
    expect(castlingAbility.validate('KQ')).to.equal('KQ');
  });
  it ('- is valid', () => {
    expect(castlingAbility.validate('-')).to.equal('-');
  });
})

describe('castlingAbility.remove()', () => {
  const castlingAbility = new CastlingAbility();
  it ('Remove K from KQkq', () => {
    expect(castlingAbility.remove('KQkq','w',[Piece.K])).to.equal('Qkq');
  });
  it ('Remove Q from KQkq', () => {
    expect(castlingAbility.remove('KQkq','w',[Piece.Q])).to.equal('Kkq');
  });
  it ('Remove k from KQkq', () => {
    expect(castlingAbility.remove('KQkq','b',[Piece.K])).to.equal('KQq');
  });
  it ('Remove q from KQkq', () => {
    expect(castlingAbility.remove('KQkq','b',[Piece.Q])).to.equal('KQk');
  });
  it ('Remove KQ from KQkq', () => {
    expect(castlingAbility.remove('KQkq','w',[Piece.Q,Piece.K])).to.equal('kq');
  });
  it ('Remove kq from KQkq', () => {
    expect(castlingAbility.remove('KQkq','b',[Piece.Q,Piece.K])).to.equal('KQ');
  });
})

describe('castlingAbility.castle()', () => {
  const castlingAbility = new CastlingAbility();
  it ('Castle w from KQkq', () => {
    expect(castlingAbility.castle('KQkq','w')).to.equal('kq');
  });
  it ('Castle b from KQkq', () => {
    expect(castlingAbility.castle('KQkq','b')).to.equal('KQ');
  });
  it ('Castle w and b from KQkq', () => {
    let castled = castlingAbility.castle('KQkq', 'w');
    castled = castlingAbility.castle(castled, 'b');
    expect(castled).to.equal('-');
  });
  it ('Castle b and w from KQkq', () => {
    let castled = castlingAbility.castle('KQkq', 'b');
    castled = castlingAbility.castle(castled, 'w');
    expect(castled).to.equal('-');
  });
})
