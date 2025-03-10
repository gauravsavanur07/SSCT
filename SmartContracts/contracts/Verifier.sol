pragma solidity ^0.8.0;

/*
Verifer proof utilising ECDA to store the sensitive transactional data on the Elyptic curve
*/
contract Verifier{

function verifyProof(

            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[4] memory input
        ) public view returns (bool r) {
        Proof memory proof;
        proof.A = Pairing.G1Point(a[0], a[1]);
        proof.B = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.C = Pairing.G1Point(c[0], c[1]);
        uint[] memory inputValues = new uint[](input.length);
        for(uint i = 0; i < input.length; i++){
            inputValues[i] = input[i];
        }
        //The following function looks for the input values and proof in the verify function and if it equates to 0 it returns true
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}
