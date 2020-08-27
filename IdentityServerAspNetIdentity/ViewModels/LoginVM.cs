using System;
using System.ComponentModel.DataAnnotations;

namespace IdentityServerAspNetIdentity.ViewModels
{
    public class LoginVM
    {
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
