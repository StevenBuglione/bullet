using System;
namespace IdentityServerAspNetIdentity.ViewModels
{
    public class UserStateVM
    {
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
    }
}
