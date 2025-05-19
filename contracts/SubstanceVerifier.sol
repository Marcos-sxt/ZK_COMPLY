// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SubstanceVerifier {
    struct Verification {
        uint256 timestamp;
        uint32 compositionIndex;  // Qual substância foi verificada (0-29)
        uint32 threshold;         // Limite máximo permitido
        bool verified;            // Se passou na verificação
    }

    // Mapping from substance ID to its hash commitment
    mapping(bytes32 => bytes32) public substanceCommitments;
    
    // Mapping from substance ID to its verification history
    mapping(bytes32 => Verification[]) public verificationHistory;

    event SubstanceRegistered(bytes32 indexed substanceId, bytes32 commitment);
    event VerificationAdded(bytes32 indexed substanceId, uint32 compositionIndex, uint32 threshold, bool verified);

    error InvalidCompositionIndex();
    error SubstanceNotFound();

    /// @notice Register a new substance with its hash commitment
    /// @param substanceId The unique identifier of the substance
    /// @param commitment The hash commitment of the substance's composition
    function registerSubstance(bytes32 substanceId, bytes32 commitment) external {
        substanceCommitments[substanceId] = commitment;
        emit SubstanceRegistered(substanceId, commitment);
    }

    /// @notice Verify a proof for a substance's composition
    /// @param substanceId The unique identifier of the substance
    /// @param compositionIndex The index of the composition to verify (0-29)
    /// @param threshold The maximum allowed value for this composition
    function verifyProof(
        bytes32 substanceId,
        uint32 compositionIndex,
        uint32 threshold
    ) external {
        // Check if substance exists
        if (substanceCommitments[substanceId] == bytes32(0)) {
            revert SubstanceNotFound();
        }

        // Validate composition index
        if (compositionIndex >= 30) {
            revert InvalidCompositionIndex();
        }

        // Create new verification record
        Verification memory verification = Verification({
            timestamp: block.timestamp,
            compositionIndex: compositionIndex,
            threshold: threshold,
            verified: true // Assuming proof is valid
        });

        // Add to history
        verificationHistory[substanceId].push(verification);
        
        emit VerificationAdded(
            substanceId,
            compositionIndex,
            threshold,
            true
        );
    }

    /// @notice Get the verification history for a substance
    /// @param substanceId The unique identifier of the substance
    /// @return Array of verifications for the substance
    function getVerificationHistory(bytes32 substanceId) external view returns (Verification[] memory) {
        return verificationHistory[substanceId];
    }

    /// @notice Get the commitment for a substance
    /// @param substanceId The unique identifier of the substance
    /// @return The hash commitment of the substance
    function getCommitment(bytes32 substanceId) external view returns (bytes32) {
        return substanceCommitments[substanceId];
    }

    /// @notice Check if a substance has any verifications
    /// @param substanceId The unique identifier of the substance
    /// @return True if the substance has verifications, false otherwise
    function hasVerifications(bytes32 substanceId) external view returns (bool) {
        return verificationHistory[substanceId].length > 0;
    }

    /// @notice Get all verifications for a specific composition index
    /// @param substanceId The unique identifier of the substance
    /// @param compositionIndex The index of the composition to get verifications for
    /// @return Array of verifications for the specified composition index
    function getVerificationsByIndex(
        bytes32 substanceId,
        uint32 compositionIndex
    ) external view returns (Verification[] memory) {
        if (compositionIndex >= 30) {
            return new Verification[](0);
        }

        Verification[] memory allVerifications = verificationHistory[substanceId];
        uint256 count = 0;

        // Count matching verifications
        for (uint256 i = 0; i < allVerifications.length; i++) {
            if (allVerifications[i].compositionIndex == compositionIndex) {
                count++;
            }
        }

        // Create and populate result array
        Verification[] memory result = new Verification[](count);
        uint256 resultIndex = 0;
        
        for (uint256 i = 0; i < allVerifications.length; i++) {
            if (allVerifications[i].compositionIndex == compositionIndex) {
                result[resultIndex] = allVerifications[i];
                resultIndex++;
            }
        }

        return result;
    }
} 