using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevelopmentPracticalTest.CodeGenerator
{
    public class ClientUniqueCodeGenerator
    {


        public string GenerateClientCode(string clientName, IEnumerable<string> existingCodes)
        {
            if (string.IsNullOrWhiteSpace(clientName))
            {
                throw new ArgumentException("Client name cannot be null or empty.", nameof(clientName));
            }

            var prefix = clientName.Substring(0, Math.Min(3, clientName.Length)).ToUpper();
          

            if (prefix.Length < 3)
            {
                int lettersToAdd = 3 - prefix.Length;
                for (int i = 0; i < lettersToAdd; i++)
                {
                    prefix += (char)('A' + i);
                }
            }

            var maxCode = existingCodes
                .Where(c => c.StartsWith(prefix))
                .OrderByDescending(c => c)
                .FirstOrDefault();

            var nextCodeNumber = 1;

            if (maxCode != null)
            {
                var codeSuffix = int.Parse(maxCode.Substring(3));
                nextCodeNumber = codeSuffix + 1;
            }

            return $"{prefix}{nextCodeNumber:D3}";
        }
    }
}